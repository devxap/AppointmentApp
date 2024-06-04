const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Appointment = require('../models/Appointment');

module.exports.request = async (req, res, next) => {
    const { studentID, teacherID, date, time } = req.body;
    let usertype = await Student.findById(studentID);
    let appointee = await Student.findById(teacherID);
    if (!usertype) {
        usertype = await Teacher.findById(teacherID);
    }
    if (!appointee) {
        appointee = await Teacher.findById(teacherID);
    }
    console.log(usertype.type);
    if (usertype.type == "s" || usertype.type == "S" && usertype.type != "t" && usertype.type != "T") {
        const user = await Appointment.create({
            student: studentID,
            teacher: teacherID,
            date,
            time
        });

        if (!user) {
            next(error);
        }
        else {
            await Student.findByIdAndUpdate(studentID, { $push: { appointments: user.id } }, { new: true });
            await Teacher.findByIdAndUpdate(teacherID, { $push: { appointments: user.id } }, { new: true });

            res.status(200).json({
                success: true,
                user,
            })
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: "Feature accesible to type s or type S"
        })
    }

}

module.exports.appoint = async (req, res, next) => {
    const { appointmentID } = req.body;

    try {
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { _id: appointmentID },             // Filter by appointment ID
            { $set: { approvalStatus: true } }, // Update operation
            { new: true, runValidators: true }  // Options to return the updated document and run validators
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (err) {
        next(err); // Pass errors to the error handling middleware
    }
};

module.exports.reject = async (req, res, next) => {
    const { appointmentID } = req.body;

    try {
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { _id: appointmentID },             // Filter by appointment ID
            { $set: { approvalStatus: false } }, // Update operation
            { new: true, runValidators: true }  // Options to return the updated document and run validators
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(updatedAppointment);
    } catch (err) {
        next(err); // Pass errors to the error handling middleware
    }
};

module.exports.getAllAppointments = async (req, res, next) => {
    const userID = req.params.id;

    let user = await Student.findById(userID);
    if (!user) {
        user = await Teacher.findById(userID);
        if (!user) {
            res.status(501).json({
                success: false,
                message: "Couldn't find"
            })
        }
    }

    if (user.type == "t" || user.type == "T") {
        const users = await Appointment.find({ teacher: userID });
        res.status(200).json({
            success: true,
            users,
        })
    }
    else if (user.type == "s" || user.type == "S") {
        const users = await Appointment.find({ student: userID });
        res.status(200).json({
            success: true,
            users,
        })
    }
    else {
        res.status(501).json({
            success: false,
            message: "Check issue in AppointmentController/getAllAppointments"
        })
    }
}

module.exports.getAllTeachers = async (req, res, next) => {

    const users = await Teacher.find();
    if (!users) {
        res.status(501).json({
            success: false,
            message: "Couldn't find"
        })
    }
    else {
        res.status(200).json({
            success:true,
            users,
        })
    }
}

module.exports.countDocuments =async(req,res,next)=>{
    const userID = req.params.id;

    let user = await Student.findById(userID);
    if (!user) {
        user = await Teacher.findById(userID);
        if (!user) {
            res.status(501).json({
                success: false,
                message: "Couldn't find"
            })
        }
    }

    if (user.type == "t" || user.type == "T") {
        const count = await Appointment.countDocuments({ teacher: userID });
        res.status(200).json({
            count
        })
    }
    else if (user.type == "s" || user.type == "S") {
        const count = await Appointment.countDocuments({ student: userID });
        res.status(200).json({
            count
        })
    }
    else {
        res.status(501).json({
            success: false,
            message: "Check issue in AppointmentController/countDocuments"
        })
    }

}
