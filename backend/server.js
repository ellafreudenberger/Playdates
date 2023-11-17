require("dotenv").config();
const mongoose =  require("mongoose");
const express = require("express")

const app = express()

//database connection 

const connectDB = require("./database/dbconnect");
connectDB();


//starting the server
app.get("/", (req, res) => {
    res.send("Welcome to our homepage")
})

app.get("/admin", (req, res) => { 
    res.send("This is the top secret admin page")
})

app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });



