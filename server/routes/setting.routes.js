const express = require("express");
const auth = require("../middleware/auth.middleware");
const Setting = require("../models/Setting");
const Work = require("../models/Work");
const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query;
            const list = await Setting.find({[orderBy]: equalTo});
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(async (req, res) => {
        console.log(req.body)
        try {
            const newSetting = await Setting.create({
                ...req.body,
                type: "setting",
            });
            res.status(201).send(newSetting);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.patch("/:settingId",async (req, res) => {
    try {
        const {settingId} = req.params;
        // const findSetting = await Work.findById(settingId);
        const updatedSetting = await Setting.findByIdAndUpdate(
            settingId,
            req.body,
            {new: true}
        );
        res.send(updatedSetting);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.delete("/:settingId", async (req, res) => {
    try {
        const {settingId} = req.params;
        const removeSetting = await Setting.findById(settingId);
        await removeSetting.remove();
        return res.send(null);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
