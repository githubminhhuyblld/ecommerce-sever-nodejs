const Product = require("../models/product")
const Category = require("../models/category");
const User = require("../models/User");
const removeCommonFiled = require("../Untils/removeCommonFiled")


const productController = {
    addProduct: async (req, res) => {
        try {
            const {name, newPrice, oldPrice, rating, description, sizes, image, category, variants, shop} = req.body;
            let sale = ((oldPrice - newPrice) / oldPrice) * 100;
            if (sale < 0) {
                sale = 0
            }
            sale = Math.round(sale);
            const product = await Product.create({
                name,
                newPrice,
                oldPrice,
                sale,
                rating,
                description,
                sizes,
                image,
                category,
                variants,
                shop
            });

            res.status(200).json({product});
        } catch (error) {
            res.status(500).json({error: error});
        }

    },
    getAllProducts: async (req, res) => {
        try {
            const {page, limit} = req.query;

            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
                populate: {
                    path: "shop",
                    select: removeCommonFiled,
                },
            };
            const {docs, totalDocs, totalPages} = await Product.paginate({}, options);

            res.status(200).json({
                products: docs,
                totalItems: totalDocs,
                totalPages: totalPages,
                currentPage: options.page,
            });
        } catch (err) {
            res.status(500).json(err)
        }
    },
    updateProductById: async (req, res) => {
        try {
            const {name, newPrice, oldPrice, rating, description, sizes, image, category, variants} = req.body;
            const sale = ((oldPrice - newPrice) / oldPrice) * 100;

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                name,
                newPrice,
                oldPrice,
                sale,
                rating,
                description,
                sizes,
                image,
                category,
                variants,

            }, {new: true});

            if (!updatedProduct) {
                return res.status(404).json({error: 'Product not found'});
            }
            res.status(200).json({product: updatedProduct});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    removeProductById: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                {isDeleted: true},
                {new: true}
            );

            if (!product) {
                return res.status(404).json({message: 'Product not found'});
            }

            res.status(200).json({message: 'Product restored', product});


        } catch (err) {
            res.status(500).json(err)
        }
    },
    filterProduct: async (req, res) => {
        try {
            const {name, minPrice, maxPrice, page, limit} = req.query;
            const conditions = {};

            switch (true) {
                case Boolean(name):
                    conditions.name = {$regex: new RegExp(name, 'i')};
                    break;
                case Boolean(minPrice) && Boolean(maxPrice):
                    conditions.newPrice = {$gte: minPrice, $lte: maxPrice};
                    break;
                case Boolean(minPrice):
                    conditions.newPrice = {$gte: minPrice};
                    break;
                case Boolean(maxPrice):
                    conditions.newPrice = {$lte: maxPrice};
                    break;
            }
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;

            const totalProducts = await Product.countDocuments(conditions);
            const totalPages = Math.ceil(totalProducts / limitNumber);

            const products = await Product.find(conditions)
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber);

            res.status(200).json({
                products,
                totalItems: totalProducts,
                totalPages,
                currentPage: pageNumber
            });


        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

}

module.exports = productController