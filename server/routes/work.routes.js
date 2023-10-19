const express = require("express");
const auth = require("../middleware/auth.middleware");
const Work = require("../models/Work");
const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query;
            const list = await Work.find({[orderBy]: equalTo});
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(async (req, res) => {
        try {
            const newWork = await Work.create({
                ...req.body,
                // userId: req.user._id,
                type: "work",
            });
            res.status(201).send(newWork);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.patch("/:workId", async (req, res) => {
    try {
        const {workId} = req.params;
        // const findWork = await Work.findById(workId);
        const updatedWork = await Work.findByIdAndUpdate(
            workId,
            req.body,
            {new: true}
        );
        res.send(updatedWork);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

router.delete("/:workId", async (req, res) => {
    try {
        const {workId} = req.params;
        const removeWork = await Work.findById(workId);
        await removeWork.remove();
        return res.send(null);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
