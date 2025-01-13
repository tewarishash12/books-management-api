const router = require("express").Router();
const { authAdmin } = require("../middleware/authMiddleware")
const { addBook, viewBooks, viewBookById, editByTitle, deleteByTitle, searchByGenre } = require("../main_controllers/bookController")

router.post("/", authAdmin, addBook)

router.get("/", viewBooks)

router.get("/id/:id", viewBookById)

router.put('/title/:title', authAdmin, editByTitle)

router.delete("/:title", authAdmin, deleteByTitle)

router.get("/genre/:genre", searchByGenre)

module.exports = router