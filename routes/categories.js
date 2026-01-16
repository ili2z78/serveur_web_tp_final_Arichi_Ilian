const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Créer une catégorie
router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

// Voir toutes les catégories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;
