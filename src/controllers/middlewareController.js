const jwt = require("jsonwebtoken")
const {verify} = require("jsonwebtoken");
const middlewareController = {

    verifyToken: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (error, user) => {
                if (error) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("Unauthorized!!");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("You're not allowed to delete other")
            }
        })
    }
}
module.exports = middlewareController;