const express = require('express')
const router = express.Router()

const {register, login, getme, getUser, logout}= require('../controllers/AuthController');
const { appoint, request, reject, getAllAppointments, getAllTeachers, countDocuments } = require('../controllers/AppointmentController');
const { isAuthenticatedUser } = require('../controllers/isAuthenticated');

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/me").get(isAuthenticatedUser,getme);
router.route("/request").post(request);
router.route("/appoint").patch(appoint);
router.route("/reject").patch(reject);
router.route("/appointments/:id").get(getAllAppointments);
router.route("/teachers").get(getAllTeachers);
router.route("/userdetails/:id").get(getUser);
router.route("/countDocuments/:id").get(countDocuments);

module.exports = router;

