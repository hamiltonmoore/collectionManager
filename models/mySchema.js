const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    crustStyle: Schema.Types.Mixed,
    toppings: {
        meats: Schema.Types.Mixed,
        veggies: Schema.Types.Mixed,
        cheese: {
            type: Boolean,
            required: true,
        },
        sauce: {
            type: String,
            enum: ["red", "white", "pesto"],
        }
    }
})

const pizzas = mongoose.model('pizza', pizzaSchema);

module.exports = pizzas;