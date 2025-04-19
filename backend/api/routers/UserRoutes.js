const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

// 🔥 New admin actions
router.patch("/promote/:id", userController.promoteToAdmin);
router.delete("/:id", userController.deleteUser);
router.patch("/toggle-status/:id", userController.toggleStatus);

module.exports = router;
