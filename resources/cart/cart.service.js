const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../../middleware/authentication");
const express = require("express");
const Cart = require("./cart.model");

const router = express.Router();

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const cart = await newCart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId", verifyTokenAndAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json({ count: carts.length, carts: carts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
