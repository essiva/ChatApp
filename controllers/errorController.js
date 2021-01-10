"use strict";

const httpStatus = require("http-status-codes");


exports.logErrors = (error, req, res, next) => {//middleware to handle errors
    console.error(error.stack)//log the error stack
    next(error);//pass the error to the next middleware
};

exports.pageNotFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;//responding with 404 status code
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {//Send content in 404.html
        root: "./"
    });
};

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;//catch all errors and respond with a 500 status code
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, out application is taking a nap!`);
};