const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const placeRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error").default;
// const usersRouters = require("./routes/users-routes");

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'Origin, X-Requested-Width, Constent-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PATCH', 'DELETE')
})

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
    "mongodb+srv://root:uj6eqjfGnAdfVzsV@firstcluster.dasacxo.mongodb.net/mern?retryWrites=true&w=majority"
    , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen(5000);
    console.log('connected');
  })
  .catch(err => {
    console.log(err);
  });
