const {Leaderboard, Users} = require('../../models');


const create = async (req, res) => {
    const { point_total} = req.body;
    try {
        const newLeaderboard = await Leaderboard.create({
            point_total,
        });
        return res.status(201).json({
            message: "Leaderboard created",
            data: newLeaderboard,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error creating leaderboard",
        });
        // console.log(error);
    }
}

const readAll = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.findAll({
            include: [{
                model: Users,
                as: 'Users',
            }],
        });
        return res.status(200).json({
            message: "Leaderboard found",
            data: leaderboard,
        });
    } catch (error) {
        // return res.status(400).json({
        //     message: "Error finding leaderboard",
        // });
        console.log(error);
    }
}

const readOne = async (req, res) => {
    const {id} = req.params;
    try {
        const leaderboard = await Leaderboard.findOne({
            where: {id},
            include: [{
                model: Users,
                as: 'Users',
            }],
        });
        return res.status(200).json({
            message: "Leaderboard found",
            data: leaderboard,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error finding leaderboard",
        });
        // console.log(error);
    }
}

const update = async (req, res) => {
    const {id} = req.params;
    const {point_total} = req.body;
    try {
        const leaderboard = await Leaderboard.update({
            point_total,
        }, {
            where: {id},
        });
        return res.status(200).json({
            message: "Leaderboard updated",
            data: leaderboard,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error updating leaderboard",
        });
        // console.log(error);
    }
}

const destroy = async (req, res) => {
    const {id} = req.params;
    try {
        const leaderboard = await Leaderboard.destroy({
            where: {id},
        });
        return res.status(200).json({
            message: "Leaderboard deleted",
            data: leaderboard,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error deleting leaderboard",
        });
        // console.log(error);
    }
}

module.exports = {
    create,
    readAll,
    readOne,
    update,
    destroy,
}