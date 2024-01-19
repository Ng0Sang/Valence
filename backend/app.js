const express = require("express");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { Auth, doctorsRoutes, userRoutes, kit } = require("./routes/index");
app.use(express.static("./public"));

dotenv.config();
app.use(morgan("tiny"));
// app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/auth",cors(), Auth);
app.use("/user",cors(), userRoutes);
app.use("/kit",cors(), kit);
app.use("/doctor",cors(), doctorsRoutes);

app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  });
}

// My Server is listening on port 3000
app.listen(process.env.PORT, () => {
  console.log("Getting Started on port 3000!");
});
