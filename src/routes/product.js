const router = require("express").Router();
const productController = require("../controllers/productController")

//ADD PRODUCT
router.post("/", productController.addProduct);

//UPDATE PRODUCT
router.put("/:id", productController.updateProductById);

//GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

//DELETE PRODUCTS
router.delete("/:id", productController.removeProductById);

// SEARCH PRODUCTS
router.get("/search", productController.filterProduct);




module.exports = router;