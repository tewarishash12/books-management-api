const router = require("express").Router();
const { viewAllUsers, addBooksBorrowed, deleteuser, borrowedBookReturn } = require("../main_controllers/bookUserController");

router.get("/", viewAllUsers)

router.put("/:id/borrow", addBooksBorrowed)

router.post("/:id/return", borrowedBookReturn)

router.delete("/deleteuser/:id", deleteuser)

module.exports = router;