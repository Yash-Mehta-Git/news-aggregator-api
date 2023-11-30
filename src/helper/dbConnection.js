const express = require('express');
const mongoose = require('mongoose');

const connectToDb = () =>{
    try {
        mongoose.connect("mongodb://localhost:27017/usersdb", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("connected to the db");
    }catch (err) {
        console.log("Error connecting to the db");
    }
}

module.exports = {
    connectToDb
}