const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mySchema = new Schema({
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

const pizzas = mongoose.model('pizza', mySchema);

module.exports = pizzas;