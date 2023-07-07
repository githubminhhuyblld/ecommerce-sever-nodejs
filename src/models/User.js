const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    admin: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
    ],

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)