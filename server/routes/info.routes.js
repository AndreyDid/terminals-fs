const express = require("express");
const auth = require("../middleware/auth.middleware");
const Info = require("../models/Info");
const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query;
            const list = await Info.find({[orderBy]: equalTo});
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(async (req, res) => {
        try {
            const newInfo = await Info.create({
                ...req.body,
                // userId: req.user._id,
                type: "info",
            });
            res.status(201).send(newInfo);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.patch("/:infoId", async (req, res) => {
    try {
        const {infoId} = req.params;
        // const findInfo = await Info.findById(infoId);
        const updatedInfo = await Info.findByIdAndUpdate(
            infoId,
            req.body,
            {new: true}
        );
        res.send(updatedInfo);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.delete("/:infoId", async (req, res) => {
    try {
        const {infoId} = req.params;
        const removeInfo = await Info.findById(infoId);
        await removeInfo.remove();
        return res.send(null);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
