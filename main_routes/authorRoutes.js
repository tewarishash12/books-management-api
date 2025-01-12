const Author = require("../models/author");
const router = require("express").Router();
const {addAuthor, allAuthors, authorById, updateAuthor} = require("../main_controllers/authorController");

const {authAdmin} = require("../middleware/authMiddleware") 

router.post("/", authAdmin, addAuthor)

router.get("/", allAuthors)

router.get("/:id", authorById)

router.patch("/addbooks/:id", updateAuthor)

module.exports = router;
