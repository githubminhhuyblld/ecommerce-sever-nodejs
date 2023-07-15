const Cart = require("../models/Cart");
const Product = require("../models/Product");

const cartController = {
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
        cart.products.push({
          product: productId,
          quantity: parseInt(quantity, 10),
        });
      }

      cart.totalItems += parseInt(quantity, 10);
      cart.totalPrice += product.newPrice * parseInt(quantity, 10);

      await cart.save();

      res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateCartQuantity: async (req, res) => {
    try {
      const { cartItemId, quantity, userId } = req.body;
      const cart = await Cart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
      if (!cart) {
        return res.status(404).json({ message: "Cart not found!" });
      }
      cart.totalItems = cart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      cart.totalPrice = await cartController.updateTotalPrice(cart.products);
      await cart.save();
      res.status(200).json({ message: "Updated quantity successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Updated quantity failed!" });
    }
  },
  removeCartItems: async (req, res) => {
    try {
      const { cartItemId, userId } = req.body;

      const cart = await Cart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).json({ message: "Cart not found!" });
      }

      cart.totalItems = cart.products.reduce(
        (total, product) => total + product.quantity,
        0
      );

      cart.totalPrice = await cartController.updateTotalPrice(cart.products);

      await cart.save();
      res.status(200).json({ message: "Cart item removed successfully!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  updateTotalPrice: async (products) => {
    let totalPrice = 0;
    for (const cartItem of products) {
      const product = await Product.findById(cartItem.product);
      if (product) {
        totalPrice += cartItem.quantity * product.newPrice;
      }
    }
    return totalPrice;
  },
  getAllCartsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const carts = await Cart.find({ user: userId });

      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ error: "Can not found cart!" });
    }
  },
};
module.exports = cartController;
