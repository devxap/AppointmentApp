const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const sendToken = require('./jwtToken');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authentication


module.exports.register = async (req, res, next) => {
    try {
        const { name, email, password, type, deptcode, empid, roll, branch } = req.body;
        const emailInStudent = await Student.findOne({ email });
        const emailInTeacher = await Teacher.findOne({ email });

        if (emailInStudent || emailInTeacher) {
            return res.json({ message: "Email already registered. Try logging in or try another!", success: false });
        }

        if (type == "s" || type == "S") {
            const user = await Student.create({
                name,
                email,
                password,
                type,
                roll,
                branch
            })

            sendToken(user,200,res);
        }
        else if (type == "t" || type == "T") {
            const user = await Teacher.create({
                name,
                email,
                password,
                type,
                deptcode,
                empid
            })

            sendToken(user,200,res);

           
        }
        else {
            return res.status(401).json({
                success: false, message: "Type not defined!"
            });
        }


    } catch (error) {
        next(error);
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        let user = await Student.findOne({ email }).select("+password");

        if (!user) {
            user = await Teacher.findOne({ email }).select("+password");
            if (!user) {
                return res.status(401).json({ message: "Incorrect username or email!", success: false });
            }
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Incorrect password!", success: false });
        }

        // Assuming sendToken function is defined and sends the token to the client.
        sendToken(user, 200, res);

        // Clean up appointments
        for (const appointmentID of user.appointments) {
            const temp = await Appointment.findById(appointmentID);
            if (!temp) {
                await user.updateOne({ $pull: { appointments: appointmentID } });
            }
        }
        
    } catch (error) {
        // Handle errors
        next(error);
    }
}


module.exports.logout = async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    })


    res.status(200).json({
        success:true,
        message:"Logged out"
    })
}

module.exports.getme = async(req,res,next)=>{
    const user= await Student.findById(req.user.id);
    if(!user){
        const user= await Teacher.findById(req.user.id);
        if(!user){
            next(error);
        }
        else{
            res.status(200).json({
                success:true,
                user,
            })
        }
    }
    else{
        res.status(200).json({
            success:true,
            user,
        })
    }
}

module.exports.getUser = async(req,res,next)=>{
    const user= await Student.findById(req.params.id);
    if(!user){
        const user= await Teacher.findById(req.params.id);
        if(!user){
            next(error);
        }
        else{
            res.status(200).json({
                success:true,
                user,
            })
        }
    }
    else{
        res.status(200).json({
            success:true,
            user,
        })
    }
}

