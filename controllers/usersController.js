const User = require("../models/user");

module.exports = {

     //register
     new: (req, res) => {//takes incoming requests to create a new user and render the form in register.ejs
        res.render("users/register")
    },

    create: (req, res, next) => {//creates new user from data that comes from register.ejs form
        let userParams = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        }

        User.create(userParams)//passing those parameters
            .then(user => {
                req.flash("success", `${user.userName}'s account created successfully!`);
                res.locals.redirect = "/";//redirects new user to home page
                res.locals.user = user;//finds if there already exists this user
                next();
            })
            .catch(error => {
                console.log(`Error ${error.message}`);
                res.locals.redirect = "/register";
                req.flash(
                    "error", "Failed to create user account. This user already exists!");
                    next();
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) {
            res.redirect(redirectPath);
        }
        next();
    },

    //login
    login: (req,res,next) => {
        res.render("users/login");
    }
};