const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: `${__dirname}/public/images` });

const {
  createKit,
  updateKit,
  deleteKit,
  getKits,
  getSingleKit,
  favourite,
  getFavourites,
} = require("../../controllers/kits/kitsController");

router.get("/", getKits);
router.get("/getsinglekit/:name", getSingleKit);
router.get("/getfavouritekit/:email", getFavourites);
router.post("/createkit", upload.single("kitImage"), createKit);
router.post("/addfavourite", favourite);
router.patch("/updatekit/:kit_id", updateKit);
router.delete("/deletekit/:kit_id", deleteKit);

module.exports = router;
