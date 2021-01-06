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


mongoose.Promise = global.Promise;//using promises

mongoose.connect("mongodb://localhost:27017/chatapp_db", {//connect database
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;//create connection

db.once("open", () => {
    console.log("Successfull connection to database!")//appears on the console when the database starts successfully
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");//setting view engine and ejs

router.use(express.static("public"));//using files from public folder
router.use(layouts);//using layouts
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());


router.get("/", homeController.index);

router.get("/register", usersController.new);
router.post("/create", usersController.create, usersController.redirectView);
router.get("/login", usersController.login);


app.use("/", router);
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});