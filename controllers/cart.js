const Cart = require("../models/cart");

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.productId.push(productId);
      cart.quantity += Number(quantity);
      await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        productId: [productId],
        quantity,
      });
    }
    return res
      .status(200)
      .json({ message: "Product Added to cart successfully" }, cart);
  } catch (error) {
    return res.status(400).json(error);
  }
}
async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const cartItem = await Cart.findOne({ userId });
    if (!cartItem) {
      return res.status(401).json({ message: "Item not found in the cart" });
    }

    cartItem.productId = cartItem.productId.filter(
      (id) => id.toString() !== productId,
    );
    cartItem.quantity -= 1;
    if (cartItem.quantity <= 0) {
    await cartItem.deleteOne();
    return res.status(200).json({
      message: "Cart deleted completely"
    });
  }

    await cartItem.save();
    return res.status(200).json({ message: "Item from the cart decreased" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

async function getAll(req, res) {
  const cart = await Cart.find({ userId: req.user.id }).populate("productId");

  return res.status(200).json(cart);
}
module.exports = { addToCart, removeFromCart, getAll };
