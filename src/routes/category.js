const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

//ADD CATEGORY
router.post("/", categoryController.addCategory);

//GET ALL CATEGORIES
router.get("/", categoryController.getAllCategories);

module.exports = router;
