const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyparser = require("body-parser");
const logger = require("morgan");
const RareBook = require("./models/mySchema");
const port = process.env.PORT || 8000;

const app = express();
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/mySchema");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.post("/nameofpage", function (req, res) {
    let newPizzaSchema = new mySchema(req.body);

    newPizzaSchema
        .save()  //not sure what .save does
        .then(function (savedPizza) { //.then returns a promise(something executed after something is finished)
            res.send(savedPizza);  //can send data, just can't merge data and templetes like render can
        })
        .catch(function (err) {    //.catch returns errors 
            res.status(500).send(err);
        })
})

//search for pizzas 
app.get("/nameofpage", function (req, res) {
    mySchema.find()
        .then(function (foundPizza) {
            if (!foundPizza) {
                return res.send({ msg: "No Pizzas Found" })
            }
            res.send(foundPizza);
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})
//I think this is a search for indivisual pizzas?/or items? 
app.get("/nameofpage/:id", function (req, res) {
    mySchema.findById(req.params.id
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

app.put("/nameofpage/:id", function (req, res) { //remember Paul: this .put, .get etc doesn't do squat, it's what follows
    mySchema.findByIdAndUpdate(req.params.id, req.body)
        .then(function (updatedPizza) {
            if (!updatedPizza) {
                return res.send({ msg: "could not update pizza" });
            }
            res.send(updatedPizza);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});
app.delete("/nameofpage/:id", function (req, res) {
    mySchema.findByIdAndRemove(req.params.id)
        .then(function (message) {
            res.send(message);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

app.listen(8000, () => console.log("Server running on port 8000!"));