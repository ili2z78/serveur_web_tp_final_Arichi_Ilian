const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/marketplace_db")
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});

app.use("/api/products", require("./routes/products"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/users", require("./routes/users"));
app.use("/api/categories", require("./routes/categories"));


