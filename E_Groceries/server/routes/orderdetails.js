const express = require("express");
const  Order = require("../models/order.js");
const  allverifytoken  = require("../middleware/authmiddleware.js");

const orderRouter1 = express.Router();



orderRouter1.get('/getorder', allverifytoken, async (req, res) => {
  try {
    const orderslist = await Order.find({ userId: req.userId });
    res.send(orderslist);
    console.log(orderslist);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = orderRouter1;
