const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    title: String,
    brand: String,
    crustStyle: String,
    toppings: {
        meats: Schema.Types.Mixed,
        veggies: Schema.Types.Mixed,
        cheese: String,
        sauce: {
            type: String,
            enum: ["red", "white", "pesto"],
        }
    }
})

module.exports = mongoose.model('Pizza', pizzaSchema);
