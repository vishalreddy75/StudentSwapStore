const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  UserId:{
    type:String,
    required:true
  },
  itemName: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Item", itemSchema);

// books
