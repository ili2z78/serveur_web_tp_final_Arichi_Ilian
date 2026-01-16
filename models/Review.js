const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  commentaire: String,
  note: {
    type: Number,
    min: 1,
    max: 5
  },
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Review", reviewSchema);
