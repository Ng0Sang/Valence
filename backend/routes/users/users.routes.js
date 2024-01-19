//My code starts here
const express = require("express");
const router = express.Router();
const db = require("../../db");

const {
  getpatient,
  getsinglepatient,
  updatepatient,
  updateemail,
  deletePatient,
  postUserSymptoms,
  getUserSymptoms
} = require("../../controllers/users/users.controllers");

router.get("/", getpatient);
router.get("/getpaientsymptoms", getUserSymptoms);
router.get("/getsinglepatient/:user_id", getsinglepatient);
router.patch("/updatepatient/:user_id", updatepatient);
router.patch("/updateemail/:user_id", updateemail);
router.post("/patientsymptoms", postUserSymptoms);
router.delete("/deletepatient/:user_id", deletePatient);

module.exports = router;
