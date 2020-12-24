const User = require("../models/user");

module.exports = {

     //rekisteröityminen
     new: (req, res) => {
        res.render("users/register")
    },

    create: (req, res, next) => {
        let userParams = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        }

        User.create(userParams)
            .then(user => {
                res.locals.redirect = "/";
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error ${error.message}`);
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) {
            res.redirect(redirectPath);
        }
        next();
    },

    //kirjautuminen
    login: (req,res,next) => {
        res.render("users/login");
    }
};