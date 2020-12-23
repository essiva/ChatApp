const User = require("../models/user");

module.exports = {
    login: (req,res,next) => {
        res.render("users/login");
    }
};