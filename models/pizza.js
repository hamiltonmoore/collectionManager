const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    title: String,
    brand: {
        type: String,
        required: true,
    },
    crustStyle: Schema.Types.Mixed,
    toppings: {
        meats: Schema.Types.Mixed,
        veggies: Schema.Types.Mixed,
        cheese: {
            type: String,
            required: true,
        },
        sauce: {
            type: String,
            enum: ["red", "white", "pesto"],
        }
    }
})

module.exports = mongoose.model('Pizza', pizzaSchema);
