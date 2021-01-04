var mongoose = require("mongoose");

var manufacturerSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
       id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
       },
       username: String
    }
});
module.exports = mongoose.model("Manufacturer", manufacturerSchema);