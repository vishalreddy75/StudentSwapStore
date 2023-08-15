const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


userSchema.methods.generateAuthToken = async function(){
    try {
        this.tokens = [];
        const token = jwt.sign({_id:this._id},"mynameisvishalreddybommineni");
        this.tokens.push({token:token});
        await this.save()
        return token;
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = new mongoose.model('User',userSchema)
