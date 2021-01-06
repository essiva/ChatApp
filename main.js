"use strict";

//require all modules
const express = require("express"),
      app = express(),
      router = express.Router(),
      httpStatus = require("http-status-codes"),
      layouts = require("express-ejs-layouts"),
      mongoose = require("mongoose"),
      chatController = require("./controllers/chatController"),
      errorController = require("./controllers/errorController"),
      homeController = require("./controllers/homeController"),
      usersController = require("./controllers/usersController"),
      expressSession = require("express-session"),
      cookieParser = require("cookie-parser"),
      connectFlash = require("connect-flash"),
      expressValidator = require("express-validator");

router.use(cookieParser("secret_passcode"));//using cookie-parser as middleware and to use secret passcode
router.use(expressSession ({//configure express-session to use cookie-parser
    secret: "secret_passcode",//provide a secret key to encrypt session data
    cookie: {
        maxAge: 40000
    },
    resave: false,//don't want to update existing session data on the server if nothing has changed in the existing session
    saveUninitialized: false//don't want to send a cookie to the user if no messages are added to the session
}));
router.use(connectFlash());//use connect-flash as middleware

router.use((req,res,next) => {
    res.locals.flashMessages = req.flash();//pass a local object called flashMessages to the view
    next();
});

const methodOverride = require("method-override");//Lets use HTTP verbs PUT or DELETE. Use methodOverride as middleware
router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

mongoose.Promise = global.Promise;//using promises

mongoose.connect("mongodb://localhost:27017/chatapp_db", {//connect database
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;//create connection

db.once("open", () => {
    console.log("Successfull connection to database!")//appears on the console when the database connection is success
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");//setting ejs

router.use(express.static("public"));//using files from public folder
router.use(layouts);//using layout module
router.use(
    express.urlencoded({//telling the Express.js to use body-parser for processing URL-encoded and JSON parameters
        extended: false
    })
);
router.use(express.json());//analyzing data within incoming requests


router.get("/", homeController.index);//route for home page

//routes for the register and login pages
router.get("/register", usersController.new);
router.post("/create", usersController.create, usersController.redirectView);
router.get("/login", usersController.login);


app.use("/", router);
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});