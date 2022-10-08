var express = require("express");
var app = express();

const route = require("./controllers/route");
const allstations = require("./controllers/allstations");

const port = process.env.PORT || 8000;

app.use("/route", route);
app.use("/allstations", allstations);

app.listen(port, () => {
  console.log("Server is running on Port 8000");
});
