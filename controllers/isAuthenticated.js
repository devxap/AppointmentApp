const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');

module.exports.isAuthenticatedUser = async(req,res,next)=>{
    const {token}=req.cookies || {};
    let msg =  "Please Login To Access This Resource";
     if(!token){
      res.status(200).json({
         success:false,
         msg
     });
     }

     const decodedData=jwt.verify(token,process.env.JWT_SECRET);
     req.user= await Student.findById(decodedData.id);
     if(!req.user){
        req.user= await Teacher.findById(decodedData.id);
        if (!req.user) {
         msg="User not found";
         res.status(200).json({
            success:false,
            msg
        });
        }
     }
     next();
}