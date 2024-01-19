const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

// console.log(
//   process.env.API_KEY,
//   process.env.API_SECRET,
//   process.env.CLOUDINARY_NAME
// );
cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

exports.cloudinaryUpload = async (url) => {
//   console.log(url);
    const result = await cloudinary.uploader.upload(url, {
  folder: "Valence",
//   cloudinary.uploader.upload(url, { folder: "Valence" }, (error, result) => {
    // console.log(result, error);
  });
    console.log(result);
    return result;
};

// module.exports = cloudinaryUpload;
