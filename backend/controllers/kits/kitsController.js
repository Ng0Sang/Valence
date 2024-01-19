const db = require("../../db");
const { v4: uuidv4 } = require("uuid");
const { cloudinaryUpload } = require("../../utilities/helpers");
const { kit } = require("../../routes");

exports.getKits = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM kit");
    console.log(result);
    return res.json(result.rows);
  } catch (error) {
    res.json({ error: "Error getting all kits" });
  }
};

exports.getSingleKit = async (req, res) => {
  try {
    // const { kit_name } = req.params;
    const result = await db.query(
      "SELECT * FROM kit WHERE LOWER(kit_name) ILIKE LOWER('%' || $1 || '%')",
      [req.params.kit_name + "%"]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Kit not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: "Error getting single kit" });
  }
};

exports.createKit = async (req, res) => {
  try {
    const { kit_name, price, description } = req.body;
    const kitImage = req.file;
    // console.log(typeof kitImage.path);
    // console.log(cloudinaryUpload());
    const cloudinary = await cloudinaryUpload(kitImage.path);

    console.log(cloudinary);
    const kit_id = uuidv4();
    const image_id = cloudinary.public_id;
    const image_url = cloudinary.secure_url;

    const result = await db.query(
      "INSERT INTO kit (kit_id, kit_name, price, image_url, image_id, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [kit_id, kit_name, price, image_url, image_id, description]
    );
    return res.status(201).json({
      message: "Kit added successfully",
      data: {
        user: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server is having an error adding a kit." });
  }
};

exports.updateKit = async (req, res) => {
  try {
    const { kit_id } = req.params.kit_id;
    const { kit_name, price, description } = req.body;

    const result = await db.query(
      "UPDATE kit SET kit_name = $1, price = $2, description = $3 WHERE kit_id = $4 ",
      [kit_name, price, description, kit_id]
    );
    return res.status(200).json({
      message: "Kit updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server is having an error updating a kit." });
  }
};

exports.deleteKit = async (req, res) => {
  try {
    const { kit_id } = req.params;
    const result = await db.query(
      "DELETE FROM kit WHERE kit_id = $1 RETURNING *",
      [kit_id]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server is having problems deleting a kit." });
  }
};

exports.favourite = async (req, res) => {
  try {
    const { user_id, kit_id } = req.body;

    const addFavourite = await db.query(
      "INSERT INTO favourites (user_id, kit_id) VALUES ($1, $2) RETURNING *",
      [user_id, kit_id]
    );

    // SELECT * FROM favourites join users on users.user_id=favourites.user_id;
    // SELECT * FROM kit join favourites on favourites.kit_id=kit.kit_id join users on users.user_id=favourites.user_id where email = 'daviddorcassangbo
    // t@gmail.com';
    return res.status(201).json({
      message: "Favourite added successfully",
      favourite: kit_id,
      user: user_id,
      addFavourites: addFavourite,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server is having an error adding a kit." });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    // const {email} = req.params;
    const result = await db.query(
      "SELECT * FROM kit join favourites on favourites.kit_id=kit.kit_id full outer join users on users.user_id=favourites.user_id where email = $1",
      [req.params.email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Email doesnt exist." });
    }
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.deleteFavourite = async (req, res) => {
  try {
    const { kit_id } = req.params;
    const result = await db.query(
      "DELETE FROM kit WHERE kit_id = $1 RETURNING *",
      [kit_id]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server is having problems deleting a kit." });
  }
};
