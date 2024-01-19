//My code starts here
const db = require("../../db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { cloudinaryUpload } = require("../../utilities/helpers");
const { doctors } = require("../../routes");

exports.getDoctors = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE role = 'doctor'");
    console.log(result);
    return res.json(result.rows);
  } catch (error) {
    res.json({ error: "Error getting all doctors" });
  }
};
exports.getUnverifiedDoctorDetails = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM unverified_doctor_details");
    console.log(result);
    return res.json(result.rows);
  } catch (error) {
    res.json({ error: "Error getting all doctors" });
  }
};

exports.getSingleDoctor = async (req, res) => {
  try {
    // const { name } = req.params;
    const result = await db.query(
      "SELECT * FROM users WHERE LOWER(name) ILIKE LOWER('%' || $1 || '%')",
      [req.params.name + "%"]
    );

    // console.log("I Love you Jesus");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: "Error getting single Doctor" });
  }
};
exports.getDoctorBySpecialty = async (req, res) => {
  try {
    // const { name } = req.params;
    const result = await db.query(
      "SELECT * FROM users WHERE LOWER(specialty) ILIKE LOWER('%' || $1 || '%')",
      [req.params.specialty + "%"]
    );

    // console.log("Hello Jesus");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: "Error getting single Doctor" });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dob,
      age,
      phone_number,
      home_address,
      work_place_address,
      licence,
      other_qualifications,
      years_of_experience,
      graduate_of_what_university,
      specialty,
      oath,
      role,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const doctorImage = req.file;
    // console.log(typeof doctorImage.path);
    // console.log(cloudinaryUpload());
    const cloudinary = await cloudinaryUpload(doctorImage.path);

    console.log(cloudinary);
    const user_id = uuidv4();
    const image_id = cloudinary.public_id;
    const image_url = cloudinary.secure_url;

    const result = await db.query(
      "INSERT INTO users (user_id, name, email, password, dob, age, phone_number, home_address, work_place_address, licence, other_qualifications, years_of_experience, graduate_of_what_university, specialty, oath, image_url, image_id, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *",
      [
        user_id,
        name,
        email,
        hashedPassword,
        dob,
        age,
        phone_number,
        home_address,
        work_place_address,
        licence,
        other_qualifications,
        years_of_experience,
        graduate_of_what_university,
        specialty,
        oath,
        image_url,
        image_id,
        role,
      ]
    );
    return res.status(201).json({
      message: "Doctor added successfully",
      data: {
        user: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server is having an error adding a doctor." });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const {
      dob,
      age,
      phone_number,
      home_address,
      work_place_address,
      years_of_experience,
      specialty,
    } = req.body;

    const result = await db.query(
      "UPDATE users SET dob = $1, age = $2, phone_number = $3, home_address = $4, work_place_address = $5, years_of_experience = $6, specialty = $7 WHERE user_id = $8 RETURNING *",
      [
        dob,
        age,
        phone_number,
        home_address,
        work_place_address,
        years_of_experience,
        specialty,
        user_id,
      ]
    );
    return res.status(200).json({
      message: "doctor updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server is having an error updating a doctor." });
  }
};

exports.getBookedDoctors = async (req, res) => {
  try {
    // const {email} = req.params;
    const result = await db.query(
      "SELECT * FROM users AS u1 FULL OUTER JOIN booked_doctors AS bd ON bd.doctor_id = u1.user_id FULL OUTER JOIN users AS u2 ON u2.user_id = bd.user_id WHERE u2.user_id = $1",
      [req.params.user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Email doesnt exist." });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.bookDoctor = async (req, res) => {
  try {
    const { user_id, doctor_id } = req.body;

    const bookedDoctor = await db.query(
      "INSERT INTO booked_doctors (user_id, doctor_id) VALUES ($1, $2) RETURNING *",
      [user_id, doctor_id]
    );

    // SELECT * FROM favourites join users on users.user_id=favourites.user_id;
    // SELECT * FROM kit join favourites on favourites.user_id=kit.user_id join users on users.user_id=favourites.user_id where email = 'daviddorcassangbo
    // t@gmail.com';
    return res.status(201).json({
      message: "Doctor added successfully",
      doctor: doctor_id,
      user: user_id,
      bookedDoctor: bookedDoctor,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server is having an error adding a Doctor." });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [user_id]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server is having problems deleting a doctor." });
  }
};

// console.log("Hello");
exports.verifyDoctor = async (req, res) => {
  try {
    const {
      user_id,
      doctor_name,
      doctor_specialty,
      other_qualifications_link,
    } = req.body;

    if (
      !user_id ||
      !doctor_name ||
      !doctor_specialty ||
      !other_qualifications_link
    ) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request payload." });
    }

    const doctorImage = req.file;
    const cloudinary = await cloudinaryUpload(doctorImage.path);

    // console.log(cloudinary);
    const image_id = cloudinary.public_id;
    const image_url = cloudinary.secure_url;

    const result = await db.query(
      "INSERT INTO unverified_doctor_details (user_id, doctor_name, doctor_specialty, image_url, image_id, other_qualifications_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        user_id,
        doctor_name,
        doctor_specialty,
        image_url,
        image_id,
        other_qualifications_link,
      ]
    );
    return res.status(201).json({
      message: "Doctor Details stored successfully",
      data: {
        user: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Server is having an error storing unverified Doctor Details.",
    });
  }
};
