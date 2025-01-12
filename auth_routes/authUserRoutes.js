const router = require("express").Router();
const {register, token,login} = require("../auth_controllers/authUserController") 

router.post("/register", register);

router.post("/token", token);

router.post("/login", login);

module.exports = router