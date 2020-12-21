"use strict";
const express = require("express"),
      app = express(),
      router = express.Router(),
      httpStatus = require("http-status-codes"),
      layouts = require("express-ejs-layouts"),
      //bootstrap = require("bootstrap"),
      mongoose = require("mongoose"),
      chatController = require("./controllers/chatController"),
      errorController = require("./controllers/errorController"),
      homeController = require("./controllers/homeController"),
      usersController = require("./controllers/usersController"),
      expressSession = require("express-session"),
      cookieParser = require("cookie-parser"),
      connectFlash = require("connect-flash"),
      expressValidator = require("express-validator");


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/chatapp_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfull connection to database!")
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());


router.get("/", homeController.index);





app.use("/", router);
app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
})