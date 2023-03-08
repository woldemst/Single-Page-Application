const express = require("express");

const bodyParser = require("body-parser");

const placeRoutes = require("./routes/places-routes");
// const usersRouters = require("./routes/users-routes");

const app = express();

app.use("/api/places", placeRoutes);

// app.use("/api/users", usersRouters);

app.listen(5000);
