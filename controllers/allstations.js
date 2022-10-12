var express = require("express");

const router = express.Router();
const stations = require("../station.json");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Success Data",
    code: 200,
    data: {
      stations: stations,
      total_stations: stations.length,
    },
  });
});

module.exports = router;
