var express = require("express");

const router = express.Router();
const stations = require("../station.json");

router.get("/", (req, res) => {
  let stationsData = [];
  let queryValue = req.query.value;

  if (queryValue) {
    queryValue = queryValue.toLocaleLowerCase();
    const filterData = stations.filter((ele) =>
      ele.name.toLowerCase().includes(queryValue)
    );

    stationsData = [
      ...new Map(filterData.map((item) => [item["name"], item])).values(),
    ];
  } else {
    stationsData = [...stations];
  }
  res.status(200).json({
    success: true,
    message: "Success Data",
    code: 200,
    data: {
      stations: stationsData,
      total_stations: stationsData.length,
    },
  });
});

module.exports = router;
