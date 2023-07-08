const router = require("express").Router();
const userController = require("../controllers/userController")
const middlewareController = require("../middlewares/middlewareController")

// GET ALL USER
router.get("/", middlewareController.verifyTokenAndManagerAuth, userController.getAllUsers);

//DELETE USER
router.delete("/:id",middlewareController.verifyTokenAndManagerAuth, userController.deleteUser);

module.exports = router