const { verifyTokenAndAuth } = require("../../middleware/authentication");
const express = require("express");
const Product = require("./product.model");

const router = express.Router();

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAndAuth, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.categories;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(3);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({ count: products.length, products: products });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
