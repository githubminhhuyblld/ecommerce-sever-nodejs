const router = require("express").Router();
const shopController = require("../controllers/shopController")
const middlewareController = require("../middlewares/middlewareController")

//REGISTER SHOP
router.post("/:userId",middlewareController.verifyTokenAndUserAuth, shopController.registerShop);
//UPDATE SHOP
router.put("/:userId",middlewareController.verifyTokenAndUserAuth, shopController.updateShopByUserId );


module.exports = router;