"use strict";

const mongoose = require("mongoose"),
    {Schema} = mongoose,
    userSchema = new Schema({
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            lowercase: true
        },
       
    },

    {timestamps: true}
    
);

module.exports = mongoose.model("User", userSchema);