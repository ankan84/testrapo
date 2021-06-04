const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


})
userSchema.pre('save',async function(){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,12);
    }
})

const Data=mongoose.model('Test',userSchema);
module.exports=Data;