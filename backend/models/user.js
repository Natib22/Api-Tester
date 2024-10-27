
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({ 
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true , 'Please enter an email'],
        lowercase: true,
        unique: true,
        index : true,
        validate : [isEmail , 'Please enter a valid email']
    },
    password : {
        type : String,
        required : [true , 'Please enter a password'],
        minlength : [6 , 'Minimum password length is 6 characters']
    }
})
userSchema.post('save' , function(doc , next){
    console.log("new user was created and saved" , doc);
    next();
})

userSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt);
    next();
})


const User = mongoose.model('user', userSchema);
module.exports = User;
