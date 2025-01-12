const router = require("express").Router();
const { viewAllUsers, addBooksBorrowed, deleteUser, borrowedBookReturn } = require("../main_controllers/bookUserController");

router.get("/", viewAllUsers)

router.put("/:id/borrow", addBooksBorrowed)

router.put("/:id/return", borrowedBookReturn)

router.delete("/deleteuser/:id", deleteUser)

module.exports = router;