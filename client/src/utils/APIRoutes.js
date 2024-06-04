export const host = "http://127.0.0.1:5000";

//Auth Routes
export const RegisterRoute=`${host}/register`;
export const LoginRoute=`${host}/login`;
export const LogoutRoute=`${host}/logout`;
export const CurrentUserRoute=`${host}/me`;
export const UserDetailsRoute=`${host}/:id`;

//Appointment Routes
export const Request=`${host}/request`;
export const Appoint=`${host}/appoint`;
export const Reject=`${host}/reject`;
export const AppointmentsRoute=`${host}/appointments`;
export const CountDocuments=`${host}/countDocuments/:id`;



