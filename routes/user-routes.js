const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controller");

router.get("/",function(req,res){
    res.render("home")
});

router.post("/", usersController.UserAuth);

module.exports = router