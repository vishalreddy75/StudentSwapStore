const User = require("../model/user");
const bcrypt = require("bcryptjs");


const UserAuth = async(req,res,next) => {
    // The First IF statement is for SignUp and it is executed when the req body is of length 3
    if(Object.keys(req.body).length === 3){
      const{SignupName,SignupEmail,SignupPass:plainTextPassword} = req.body
      if(!SignupName || typeof SignupName !== 'string'){
          return res.json({status:'error',error:'Invalid Username'})
      }
      if(!plainTextPassword || typeof plainTextPassword !== 'string'){
          return res.json({status:'error',error:'Invalid Password'})
      }
      if(plainTextPassword.length < 5){
          return res.json({status:'error',error:'Password too small. Should be atleast 6 characters'})
      }
      const NewSignupPass = await bcrypt.hash(plainTextPassword,10);
      let NewUser
      try {
         NewUser = new User({
          username : SignupName,
          email : SignupEmail,
          password : NewSignupPass
        });
        const token = await NewUser.generateAuthToken();
        res.cookie("jwt",token,{
          expires:new Date(Date.now()+60000 * 120)
        })
        await NewUser.save();
        // return res.status(201).json({message:"User Created",token:token});
        // return res.redirect('/items/add?token=' + token);
        return res.redirect('/items');
      } 
      catch (error) {
        if(error.code === 11000){
          return res.json({status:'error',error:'User Already Exists'})
        }
        throw error
      }
    }

    // The Second IF statement is for Login and it is executed when the req body is of length 2
    if(Object.keys(req.body).length === 2){
      const {LoginEmail,LoginPass} = req.body;
      const user = await User.findOne({email:LoginEmail})
      if(!user){
        return res.json({status:'error',error:"User doesn't exist"})
      }
      const isMatch = await bcrypt.compare(LoginPass,user.password);
      const token = await user.generateAuthToken();
      res.cookie("jwt",token,{
        expires:new Date(Date.now()+60000 * 120)
      })
      if(isMatch){
        // return res.status(201).json({message:"User Found",token:token})
        return res.redirect('/items');
      }else{
        return res.send("Invalid Password")
      }
      
      // if(await bcrypt.compare(LoginPass,user.password)){
      //   const token = await user.generateAuthToken();
      //   res.send({message:"Login Successful",token:token})
      //   return res.redirect('/items/add?token=' + token);
      //   res.redirect("/items");
      // }
      // return res.json({status:'error',error:'Invalid Email/Password'})
    }

};

exports.UserAuth = UserAuth;