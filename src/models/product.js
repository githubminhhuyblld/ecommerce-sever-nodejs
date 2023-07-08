const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema({
    variantName: {
        type: String,
        required: true,
    },
    variantDescription: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },

});
const sizeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    newPrice: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    sizes: [sizeSchema],

    image: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    variants: [productVariantSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },

}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);