const fs = require('fs')
const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const placeRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
// const usersRouters = require("./routes/users-routes");

mongoose.set('strictQuery', false);

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // not like "GET", "POST", "PATCH", "DELETE" it does not work 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.use("/api/places", placeRoutes);
app.use("/api/users", usersRoutes);

//simple 404 error message if the a route is not find
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {

  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});


mongoose
  .connect(
    "mongodb+srv://root:uj6eqjfGnAdfVzsV@firstcluster.dasacxo.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
