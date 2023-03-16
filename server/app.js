const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const placeRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
// const usersRouters = require("./routes/users-routes");

app.use(bodyParser.json());

app.use("/api/places", placeRoutes);

app.use("/api/users", usersRoutes);

//simple 404 error message if the a route is not find
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://woldemst:woldemst@firstcluster.dasacxo.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err =>{
    console.log(err);
  });

// app.listen(5000);
