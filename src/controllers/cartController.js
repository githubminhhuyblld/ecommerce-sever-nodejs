const Cart = require("../models/Cart")
const Product = require("../models/Product")

const roleController = {
    addToCart: async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            let cart = await Cart.findOne({ user: userId });
            if (!cart) {
                cart = new Cart({ user: userId, products: [] });
            }

            const existingProduct = cart.products.find(
                (item) => item.product.toString() === productId
            );

            if (existingProduct) {
                existingProduct.quantity += parseInt(quantity, 10);
            } else {
                cart.products.push({ product: productId, quantity: parseInt(quantity, 10) });
            }

            cart.totalItems += parseInt(quantity, 10);
            cart.totalPrice += product.newPrice * parseInt(quantity, 10);

            await cart.save();

            res.status(200).json({ message: "Product added to cart successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }


    }
}
module.exports = roleController;