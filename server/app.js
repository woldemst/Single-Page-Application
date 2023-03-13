const express = require("express");
const bodyParser = require("body-parser");
const placeRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes")
const HttpError = require("./models/http-error");
// const usersRouters = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json())

app.use("/api/places", placeRoutes);

app.use("/api/users", usersRoutes);

//simple 404 error message if the a route is not find
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" }); 
});

app.listen(5000);
