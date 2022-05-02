const {res, req, response} = require("express");
var fs = require("fs");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));
app.set("view engine", "ejs");
var axios = require("axios");
var results;

// Take the module to use
var mongoose = require("mongoose");
var uri = "mongodb+srv://dbuser:demopass@cluster0-6tein.mongodb.net/mongoosedemos";
// connectin to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// introduce Schema User
const User = mongoose.model("User", {
    username: String,
    password: Number,
    birthday: Date
});


// Return all documents in collection
app.get('/getall', function(req, res){
    // get all objects from the database
    User.find({}, function(err, results) {
        console.log(results);
    });
});

// Return one item with the given id
app.get('/:id', function(req,res){
    User.findById(id, function (err, user){
        console.log(user);
    })
});

// Create a new document in the collection
app.post('/add', function(req, res){
    // introduce Schema User
    const User = mongoose.model("User", {
    username: String,
    password: Number,
    birthday: Date
});
    // new object for saving
    var newUser = new User({
    username: "Jack",
    password: 1234,
    birthday: '2000-12-24'
});
    // insert object to database
    newUser.save(function(err, user) {
    if (err) return console.log(err);
    console.log(user);
});
res.send(user)
});


// Update the document with the given id
app.put('/update/:id', function(req, res){
    // find object introduced in query and update it with newdata
    var query = { username: "carlsmith" };
    var newdata = { username: "Jock", password: 9999 };
    // the changed value is returned if find, otherwise the old value
    var options = { new: true };
    //run the function
    User.findOneAndUpdate(
        query,
        newdata,
        options,
        function(err, results) {
            console.log(results);
        }
        );
});

// Delete the item with the given id
app.delete('/delete/:id', function(req, res){
    User.findByIdAndRemove({_id: req.params.propertyId}, req.body, function(err, data){
        if(!err){
            console.log("Deleted");
        }
    });
});



// Error message
app.get('*', function(req, res){
    res.status(404).send("Error");
    console.log("err");
});

// Listen port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
