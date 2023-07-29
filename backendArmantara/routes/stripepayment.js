const express = require("express");
const { appendFile } = require("fs/promises");
const router = express.Router();

const { makepayment } = require("../controllers/stripepayment");

router.post("/stripepayment", makepayment)
module.exports = router;