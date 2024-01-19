const doctorsRoutes = require("./doctors/doctors.routes");
const userRoutes = require("./users/users.routes");
const Auth = require("./Auth/authRoutes");
const kit = require("./kits/kitsRoutes");


module.exports = {doctorsRoutes, userRoutes, Auth, kit};