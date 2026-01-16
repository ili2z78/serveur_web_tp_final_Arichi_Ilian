const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nom: String,
  prix: {
    type: Number,
    min: 0
  },
  stock: Number,
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Product", productSchema);
