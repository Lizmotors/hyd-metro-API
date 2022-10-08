var express = require('express');

const router = express.Router()
const stations = require("../station.json")


router.get("/", (req, res) => {
    res.status(200).json({
        stations: stations
    })
})

module.exports = router