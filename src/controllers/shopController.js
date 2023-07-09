const User = require("../models/User")
const Shop = require("../models/shop")


const shopController = {
    registerShop: async (req, res) => {
        try {
            const userId = req.params.userId;
            const {name, description, image, address} = req.body;

            const existingShop = await Shop.findOne({name: name});
            if (existingShop) {
                return res.status(400).json({message: 'The store already exists!'});
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({message: 'User not found !'});
            }
            if (user.shop) {
                return res.status(400).json({message: 'User already register shop!'});
            }

            const newShop = new Shop({
                name,
                description,
                image,
                address,
            });
            const savedShop = await newShop.save();
            await User.findOneAndUpdate(
                {_id: userId},
                {$set: {shop: savedShop._id}},
                {new: true}
            );

            res.status(200).json({message: 'successfully', shop: savedShop});


        } catch (error) {
            console.log(error)
            res.status(500).json({message: error});
        }

    },
    updateShopByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;
            const { name, description, image, address } = req.body;

            const existingShop = await Shop.findOne({ name: name });
            if (existingShop) {
                return res.status(400).json({ message: "The store already exists!" });
            }
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            const updatedShop = await Shop.findOneAndUpdate(
                { _id: user.shop },
                { name, description, image, address },
                { new: true }
            );

            if (!updatedShop) {
                return res.status(404).json({ message: "Shop not found!" });
            }
            await user.save();
            res.status(200).json({ message: "Shop updated successfully", shop: updatedShop });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error updating shop", error: error.message });
        }
    }
}
module.exports = shopController;