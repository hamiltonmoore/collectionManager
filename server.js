const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyparser = require("body-parser");
const logger = require("morgan");
const RareBook = require("./models/mySchema");

const app = express();
mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/mySchema");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(logger("dev"));