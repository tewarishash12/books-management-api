const router = require("express").Router();
const { viewAllUsers, addBooksBorrowed, deleteUser, borrowedBookReturn } = require("../main_controllers/bookUserController");
const { authAdmin } = require("../middleware/authMiddleware")

router.get("/", viewAllUsers)

router.put("/:id/borrow", authAdmin, addBooksBorrowed)

router.put("/:id/return", authAdmin, borrowedBookReturn)

router.delete("/deleteuser/:id", authAdmin, deleteUser)

module.exports = router;