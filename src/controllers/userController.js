const bcrypt = require("bcrypt")
const User = require("../models/User")

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }

    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {isDeleted: true},
                {new: true}
            );

            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            res.status(200).json({message: 'User restored', user});


        } catch (err) {
            res.status(500).json(err)
        }

    },
}
module.exports = userController