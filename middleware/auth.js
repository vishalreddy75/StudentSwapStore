const jwt = require("jsonwebtoken");
const SECRET_KEY = "mynameisvishalreddybommineni";

const auth = (req, res, next)=>{

    try {

        let token = req.cookies.jwt;
        if(token){
            let data = jwt.verify(token, SECRET_KEY );
            req.UserID = data._id;
            next();
        }
        else{
            // return res.status(401).json({error:"Not Token available",message: "Unauthorized User"});
            return res.redirect("/")
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({error:"Something Went Wrong",message: "Unauthorized User"});
    }

}

module.exports = auth;