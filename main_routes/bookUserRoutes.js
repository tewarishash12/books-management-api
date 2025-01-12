const router = require("express").Router();
const { viewAllUsers, addBooksBorrowed, returnBorrowedBook } = require("../main_controllers/bookUserController");

router.get("/", viewAllUsers)

router.put("/:id/borrow", addBooksBorrowed)

router.delete("/deleteuser/:id", returnBorrowedBook)

module.exports = router;