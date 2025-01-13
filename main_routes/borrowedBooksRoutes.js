const router = require("express").Router();
const { viewBorrowedBooks } = require("../main_controllers/borrowedBooksController")

router.get("/borrow-records", viewBorrowedBooks)

module.exports = router;