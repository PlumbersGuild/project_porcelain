const express = require("express");
const router = express.Router();

router.use("/books", require("./books"));
router.use("/users", require("./users"));
router.use("/order", require("./order"));
router.use("/cart", require("./cart"));

module.exports = router;
