var express = require("express");
var app = express();

const route = require("./controllers/route");
const allstations = require("./controllers/allstations");
const allRoutes = require("./controllers/allRoute");

const port = process.env.PORT || 8000;

app.use("/route", route);
app.use("/search/allstations", allstations);
app.use("/allroutes", allRoutes);

app.listen(port, () => {
  console.log("Server is running on Port 8000");
});
