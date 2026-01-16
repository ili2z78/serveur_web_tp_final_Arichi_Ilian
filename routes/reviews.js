const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Ajouter un avis
router.post("/", async (req, res) => {
  const review = await Review.create(req.body);
  res.json(review);
});

// GET tous les avis (Triple Populate pour l'aide au code)
router.get("/", async (req, res) => {
  const reviews = await Review.find()
    .populate("auteur", "username")
    .populate({
      path: "produit",
      populate: { path: "categorie" }
    });
  res.json(reviews);
});

// Avis d’un produit (double populate : auteur)
router.get("/:productId", async (req, res) => {
  const reviews = await Review.find({ produit: req.params.productId })
    .populate("auteur", "username")
    .populate("produit");

  res.json(reviews);
});

module.exports = router;
