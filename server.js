const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bluebird = require("bluebird");
const bodyparser = require("body-parser");
const mustacheExpress = require("mustache-express");
const logger = require("morgan");
const Pizza = require("./models/pizza");
const port = process.env.PORT || 8000;

const app = express();
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/pizza");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// var pizzaArray = []; //is saving them in an array an extra step since we're using the db?

// app.get("/", function (req, res) {
//     let pizzaArray = [];
//     // populate from Db into pizzaArray
//     res.render("home", { pizzaArray: pizzaArray });
// });
//variables:

app.post("/home", function (req, res) {
    let newPizza = new Pizza(req.body); //is this a method?? //what is an instance
    console.log("this is the array: ", newPizza);
    newPizza
        .save()
        .then(function (savedPizza) { //.then returns a promise(something executed after something is finished)
            pizzaArray.push(newPizza);
            return res.redirect("/");  //can send data, just can't merge data and templetes like render can
        })
        .catch(function (err) {    //.catch returns errors 
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
            console.log(foundPizza[0].brand); // be specific about what you log to reduce clutter in the console.
            return res.render("home", { pizzaArray: foundPizza });
        })
        .catch(function (err) {
            return res.status(500).send(err);
        })
})

//I think this is a search for indivisual pizzas?/or items? 
app.get("/home/:id", function (req, res) {
    Pizza.update
    Pizza.findById(req.params.id
        .then(function (foundPizza) {
            if (!foundPizza) {
                return res.send({ msg: "No Pizza Found" })  //note the absence of plurality 
            }
            res.send(foundPizza)
        }))
        .catch(function (err) {
            res.status(500).send(err);
        })
});

app.put("/home/:id", function (req, res) { //remember Paul: this .put, .get etc doesn't do squat, it's what follows
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
app.delete("/home/:id", function (req, res) {
    Pizza.findByIdAndRemove(req.params.id)
        .then(function () {
            res.redirect("/");
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

app.listen(8000, () => console.log("Server running on port 8000!"));