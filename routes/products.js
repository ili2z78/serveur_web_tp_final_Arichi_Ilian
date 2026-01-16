const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Review = require("../models/Review");
const { roleMiddleware } = require("../middleware/role");

// GET tous les produits + catégorie + moyenne des notes
router.get("/", async (req, res) => {
  const products = await Product.find().populate("categorie").lean();
  
  // Calculer la moyenne pour chaque produit
  const productsWithRatings = await Promise.all(products.map(async (product) => {
    const reviews = await Review.find({ produit: product._id });
    const averageRating = reviews.length > 0 
      ? reviews.reduce((acc, curr) => acc + curr.note, 0) / reviews.length 
      : 0;
    return { ...product, averageRating: averageRating.toFixed(1) };
  }));

  res.json(productsWithRatings);
});

// POST ajouter un produit
router.post("/", async (req, res) => {
  if (req.body.prix < 0) {
    return res.status(400).json({ message: "Prix invalide" });
  }

  const product = await Product.create(req.body);
  res.json(product);
});

// DELETE intelligent
router.delete("/:id", roleMiddleware('admin'), async (req, res) => {
  await Review.deleteMany({ produit: req.params.id });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produit et avis supprimés" });
});

module.exports = router;
