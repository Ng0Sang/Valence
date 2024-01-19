const db = require("../../db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jsonwebtoken = require("jsonwebtoken");
const { response } = require("express");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = uuidv4();

    const result = await db.query(
      "INSERT INTO users (user_id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, name, email, hashedPassword, role]
    );
    return res.status(201).json({
      message: "sign up successful",
      data: {
        user: result.rows[0],
      },
    });
  } catch (error) {
    console.error("Error while signing up:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const hashedPassword = user.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      const { user_id, name, email, password, role } = user.rows[0];
      const token = jsonwebtoken.sign(
        { user_id, name, email, password },
        process.env.SECRET,
        {
          expiresIn: "1d",
        }
      );
      return res.json({
        message: "login successful",
        token,
        user_id,
        name,
        email,
        role,
        data: {
          user: user.rows[0],
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
      req.params.user_id,
    ]);

    if (user.rows.length !== 0) {
      const hashedPassword = user.rows[0].password;

      const comparePassword = await bcrypt.compare(
        currentPassword,
        hashedPassword
      );

      if (comparePassword) {
        const hashNewPassword = await bcrypt.hash(newPassword, 10);
        const myPassword = await db.query(
          `UPDATE users SET password = $1 WHERE user_id = $2 RETURNING *`,
          [hashNewPassword, user_id]
        );
        if (myPassword) {
          return res.status(200).json({
            message: "Password Changed Successfully",
            user: { data: newPassword, hash: hashNewPassword },
          });
        }
        return res.status(200).json({
          message: "Password and hash are not the same.",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: "Server is having error changing password." });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows[0] === 0) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    if (!password) {
      return res.status(400).json({Message: "Password Required"})
    }

    const {user_id} = req.params;
    // const user_id = user.rows[0].user_id;
    // console.log(user_id);
    
    const newPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "UPDATE users SET  password = $1 WHERE user_id = $2 RETURNING *",
      [newPassword, user_id]
    );
    return res.status(200).json({
      message: "New Password Generated Successfully",
      newPassword,
      data: { user: result.rows[0].password },
    });
  } catch (error) {
    console.error("Error while Creating New Password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};