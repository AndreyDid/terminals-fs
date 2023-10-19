const express = require("express");
const auth = require("../middleware/auth.middleware");
const ExtraWorks = require("../models/ExtraWorks");
const Terminal = require("../models/Terminal");
const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query;
            const list = await ExtraWorks.find({[orderBy]: equalTo});
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(async (req, res) => {
        try {
            const newExtraWorks = await ExtraWorks.create({
                ...req.body,
                type: "extraWorks",
            });
            res.status(201).send(newExtraWorks);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.patch("/:extraWorksId", async (req, res) => {
    try {
        const { extraWorksId } = req.params;
        const findExtraWorks = await ExtraWorks.findById(extraWorksId);
        // if (findTerminal.userId.toString() === req.user._id) {
        const updatedExtraWorks = await ExtraWorks.findByIdAndUpdate(
            extraWorksId,
            req.body,
            { new: true }
        );
        res.send(updatedExtraWorks);
        // } else {
        //   res.status(401).json({ message: "Unauthorized" });
        // }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.delete("/:extraWorkId", async (req, res) => {
    try {
        const {extraWorkId} = req.params;
        const removeExtraWorks = await ExtraWorks.findById(extraWorkId);
        await removeExtraWorks.remove();
        return res.send(null);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
