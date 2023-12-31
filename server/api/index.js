const express = require("express");
const router = express.Router();
const verify = require("../auth/verify");

router.use("/books", require("./books"));
router.use("/users", require("./users"));

router.use("/admin", require("./admin"));

router.use("/order", require("./order"));
router.use("/cart", require("./cart"));

module.exports = router;
