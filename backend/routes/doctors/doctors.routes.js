const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: `${__dirname}/public/images`});


const {
  getDoctors,
  getSingleDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  verifyDoctor,
  getDoctorBySpecialty,
  getBookedDoctors,
  bookDoctor,
  getUnverifiedDoctorDetails
} = require("../../controllers/doctors/doctors.controllers");

router.get("/", getDoctors);
router.get("/getsingledoctor/:name", getSingleDoctor);
router.get("/getunverifieddoctordetails", getUnverifiedDoctorDetails);
router.get("/getdoctor/:specialty", getDoctorBySpecialty);
router.get("/getbookeddoctor/:user_id", getBookedDoctors);
router.post("/createdoctor", upload.single('doctorImage'), createDoctor);
router.post("/verifydoctor", upload.single('doctorImage'), verifyDoctor);
router.post("/bookdoctor/", bookDoctor);
router.patch("/updatedoctor/:user_id", updateDoctor);
router.delete("/deletedoctor/:user_id", deleteDoctor);

module.exports = router;
