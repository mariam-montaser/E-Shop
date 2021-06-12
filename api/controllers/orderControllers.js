import asyncHandler from 'express-async-handler';

import Order from '../models/Order.js';

export const addOrderItems = asyncHandler( async (req, res) => {
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items.')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    })
    const createdOrder = await order.save();
    res.status(201).json(createdOrder)
  }
})

export const updateOrderToPaid = asyncHandler( async (req, res) => {
  console.log(req.body);
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isPaid = true;
    order.PaidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404)
    throw new Error('Order not found.')
  }
})

export const updateOrderToDelivered = asyncHandler( async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404)
    throw new Error('Order not found.')
  }
})

export const getUserOrders = asyncHandler( async (req, res) => {
  const orders = await Order.find({user: req.user._id});
    res.json(orders);
  
})

export const getOrderById = asyncHandler( async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if(order) {
    res.json(order);
  } else {
    res.status(404)
    throw new Error('Order not found.');
  }
})

export const getAllOrders = asyncHandler( async (req, res) => {
  const orders = await Order.find().populate('user', '_id name');
    res.json(orders);
  
})