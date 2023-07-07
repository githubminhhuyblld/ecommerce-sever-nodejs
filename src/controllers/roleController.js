const Role = require("../models/role")

const roleController = {
    addRole: async (req, res) => {
        try {
            const existingRole = await Role.findOne({name: req.body.name});
            if (existingRole) {
                return res.status(400).json({message: "Role name already exists"});
            }

            const role = await new Role({
                name: req.body.name,
                description: req.body.description,
            });

            // Lưu vai trò vào cơ sở dữ liệu
            const savedRole = await role.save();

            res.status(200).json(savedRole);
        } catch (error) {
            res.status(500).json({message:error});
        }

    }
}
module.exports = roleController;