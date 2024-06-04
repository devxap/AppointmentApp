const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please Enter Your Name."],
        maxLength:[30,"Enter less than 31 characters."],
        minLength:[5,"Enter more than 5 characters."]
    },
    email:
    {
        type:String,
        required:[true,"Please Enter Your Email."],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email."]
    },
    password: {
        type:String,
        required: [true,"Please Enter Your Password."],
        minLength:[5,"Enter more than 5 characters."],
        select:false  
    },
    type:String,
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

studentSchema.pre("save", async function(next){
    
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})

studentSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

studentSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const Student = mongoose.model('Student',studentSchema)

module.exports = Student;