const Cart = require("../models/cart");

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const qty = Number(quantity);
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: qty }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += qty;
      } else {
        cart.items.push({ productId, quantity: qty });
      }

      await cart.save();
    }

    return res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });

  } catch (error) {
    return res.status(400).json(error);
  }
}

async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;          
    const { productId } = req.params;   

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    }
    else{
      cart.items.splice(itemIndex);
    }
   

    await cart.save();

    
    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.status(200).json({ message: "Item removed successfully", cart: updatedCart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



async function getAll(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart) {
      return res.status(200).json({ items: [] }); // empty cart
    }

    // convert to plain JS object
    const plainCart = cart.toObject();

    return res.status(200).json(plainCart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { addToCart, removeFromCart, getAll };
