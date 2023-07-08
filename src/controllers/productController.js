const Product = require("../models/product")
const Category = require("../models/category");
const User = require("../models/User");

const productController = {
    addProduct: async (req, res) => {
        try {
            const {name, newPrice, oldPrice,rating, description,sizes, image, category, variants} = req.body;
            let sale = ((oldPrice - newPrice) / oldPrice) * 100;
            if(sale < 0){
                sale = 0
            }
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
            });

            res.status(200).json({product});
        } catch (error) {
            res.status(500).json({error: error});
        }

    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    updateProductById:async (req,res)=>{
        try {
            const { name, newPrice, oldPrice, rating, description, sizes, image, category, variants } = req.body;
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
            }, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json({ product: updatedProduct });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    removeProductById:async (req,res)=>{
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
    }

}

module.exports = productController