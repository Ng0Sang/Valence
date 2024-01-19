const db = require("../../db");
const { users } = require("../../routes");

exports.getpatient = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE role = 'patient'");
    return res.json(result.rows);
  } catch (error) {
    return res.status(404).json({ error: "Not found." });
  }
};

exports.getsinglepatient = async (req, res, next) => {
  console.log("Hello Jesus");
  try {
    // const { name } = req.params;
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
      req.params.user_id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: "Error getting single Patient" });
  }
};

exports.updatepatient = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const {
      email,
      dob,
      age,
      phone_number,
      home_address,
      diagnosis,
      years_with_illness,
    } = req.body;

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1 AND user_id != $2",
      [email, user_id]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // console.log( name,
    //     dob,
    //     age,
    //     phone_number,
    //     home_address,
    //     diagnosis,
    //     years_with_illness);

    const updateUserDetails = await db.query(
      "UPDATE users SET  dob=$1, age=$2, phone_number=$3, home_address=$4, diagnosis=$5, years_with_illness=$6 WHERE user_id = $7 RETURNING *",
      [
        dob,
        age,
        phone_number,
        home_address,
        diagnosis,
        years_with_illness,
        user_id,
      ]
    );

    console.log("I will find it out soon");
    return res.status(200).json({
      message: "Patient Details updated successfully",
      user: updateUserDetails.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Not found" });
  }
};

exports.updateemail = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    // console.log(user_id);
    const { email } = req.body;
    console.log(email);

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1 AND user_id != $2",
      [email, user_id]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // console.log( name,
    //     dob,
    //     age,
    //     phone_number,
    //     home_address,
    //     diagnosis,
    //     years_with_illness);

    const updateemail = await db.query(
      "UPDATE users SET email = $1 WHERE user_id = $2 RETURNING *",
      [email, user_id]
    );

    // console.log(updateUserDetails);
    return res.status(200).json({
      message: "Email updated successfully",
      user: updateemail.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: `${error} Not found` });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [user_id]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.postUserSymptoms = async (req, res) => {
  try {
    const {
      user_id,
      patient_name,
      patient_diagnosis,
      patient_symptoms,
      patient_gender,
    } = req.body;

    const response = await db.query(
      "INSERT INTO user_symptoms (user_id, patient_name, patient_diagnosis, patient_symptoms, patient_gender) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        user_id,
        patient_name,
        patient_diagnosis,
        patient_symptoms,
        patient_gender,
      ]
    );
    return res.status(201).json({
      message: "Details Created Succesfully",
      data: { user: response.rows[0] },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server is having an error adding a doctor." });
  }
};

exports.getUserSymptoms = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM user_symptoms");
    return res.status(200).json({ result: response.rows });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
