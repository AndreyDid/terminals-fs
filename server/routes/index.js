const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/info", require("./info.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/extraWorks", require("./extraWorks.routes"));
router.use("/work", require("./work.routes"));
router.use("/body", require("./body.routes"));
router.use("/terminal", require("./terminal.routes"));
router.use("/user", require("./user.routes"));
router.use("/setting", require("./setting.routes"));

module.exports = router;
