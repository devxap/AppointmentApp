const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    date:{
        type:Date,
        default: Date.now()
    },
    time: String,
    approvalStatus: {
        type: Boolean,
        default: false
    }
});

const Appointment = mongoose.model('Appointment',appointmentSchema)

module.exports = Appointment;