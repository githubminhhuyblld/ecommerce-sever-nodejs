const mongoose = require("mongoose");

const ShopStatus = {
    ACTIVE: 'ACTIVE',
    NO_ACTIVE: 'NO_ACTIVE'
};


const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [ShopStatus.ACTIVE, ShopStatus.NO_ACTIVE],
        default: ShopStatus.NO_ACTIVE
    }
}, {timestamps: true});

module.exports = mongoose.model("Shop", shopSchema);


