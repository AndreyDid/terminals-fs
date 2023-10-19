const express = require("express");
const auth = require("../middleware/auth.middleware");
const Terminal = require("../models/Terminal");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Terminal.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newTerminal = await Terminal.create({
        ...req.body,
        // userId: req.user._id,
        type: "terminal",
      });
      res.status(201).send(newTerminal);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router.patch("/:terminalId", async (req, res) => {
  try {
    const { terminalId } = req.params;
    const findTerminal = await Terminal.findById(terminalId);
    // if (findTerminal.userId.toString() === req.user._id) {
      const updatedTerminal = await Terminal.findByIdAndUpdate(
        terminalId,
        req.body,
        { new: true }
      );
      res.send(updatedTerminal);
    // } else {
    //   res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:terminalId", async (req, res) => {
  try {
    const { terminalId } = req.params;
    const removeTerminal = await Terminal.findById(terminalId);
    // if (removeTerminal.userId.toString() === req.user._id) {
      await removeTerminal.remove();
      return res.send(null);
    // } else {
    //   res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
