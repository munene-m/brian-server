const mongoose = require("mongoose")

const propertySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    size:{
        type: String,
        required: true
    },

}, {timeStamps: true})

module.exports = mongoose.model("property", propertySchema)