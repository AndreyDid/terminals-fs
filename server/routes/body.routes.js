const express = require("express");
const auth = require("../middleware/auth.middleware");
const Bodies = require("../models/Bodies");
const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query;
            const list = await Bodies.find({[orderBy]: equalTo});
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(async (req, res) => {
        try {
            const newBodies = await Bodies.create({
                ...req.body,
                type: "body",
            });
            res.status(201).send(newBodies);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.delete("/:bodyId", async (req, res) => {
    try {
        const {bodyId} = req.params;
        const removeBodies = await Bodies.findById(bodyId);
        await removeBodies.remove();
        return res.send(null);
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;
