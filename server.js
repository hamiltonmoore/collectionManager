const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bluebird = require("bluebird");
const bodyparser = require("body-parser");
const mustacheExpress = require("mustache-express");
const logger = require("morgan");
const Pizza = require("./models/pizza");
const port = process.env.PORT || 8100;

const app = express();
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/pizza");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//this creates a new item to be saved into database
app.post("/home", function (req, res) {
    let newPizza = new Pizza(req.body);
    newPizza
        .save()
        .then(function (savedPizza) { //.then returns a promise(something executed after something is finished)
            return res.redirect("/");  //can send data, just can't merge data and templetes like render can
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

//search for pizzas 
app.get("/", function (req, res) {
    Pizza.find()
        .then(function (foundPizza) {
            if (!foundPizza) {
                return res.send({ msg: "No Pizzas Found" })
            }
            return res.render("home", { Pizza: foundPizza });
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

//I think this is a search for indivisual pizzas?/or items? 
app.get("/edit/:id", function (req, res) {
    Pizza.findById(req.params.id)
        .then(function (foundPizza) {
            if (!foundPizza) {
                return res.send({ msg: "No Pizza Found" })  //note the absence of plurality 
            }
            res.render("edit", { Pizza: foundPizza })
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
});

app.post("/edit/:id", function (req, res) {  //this is the update request 
    Pizza.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedPizza) {
            if (!updatedPizza) {
                return res.send({ msg: "could not update pizza" });
            }
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});
app.post("/delete/:id", function (req, res) {
    Pizza.findByIdAndRemove(req.params.id)
        .then(function () {
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

app.listen(8100, () => console.log("Server running on port 8100!"));