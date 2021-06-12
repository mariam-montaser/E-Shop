import asyncHandler from "express-async-handler";

import Product from '../models/Product.js';


export const getProducts = asyncHandler(async(req, res) => {
  const pageSize = 4;
  const page = parseInt(req.query.pageNumber) || 1;

  const term = req.query.term ? {
    name: {$regex: req.query.term, $options: 'i'}
  } : {};

  const count = await Product.countDocuments({...term});
  const products = await Product.find({...term}).limit(pageSize).skip(pageSize * (page - 1));
  res.json({products, page, pages: Math.ceil(count/ pageSize)});
})

export const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findOne({_id: req.params.id});
  if(product) {
    res.json(product);
  } else {
    res.status(404);
    throw new  Error( 'Product not found.');
  }
})

export const getTopProducts = asyncHandler(async(req, res) => {
  const products = await Product.find().sort({rating: -1}).limit(3);
  res.json(products);
})

export const createProduct = asyncHandler( async(req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct)
})

export const updateProduct = asyncHandler( async(req, res) => {
  const {name, price, description, brand, category, image, countInStock} = req.body;
  const product = await Product.findById(req.params.id);
  if(product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock =countInStock;
    const updatedProduct = await product.save();
    res.status(200);
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
})

export const createReview = asyncHandler( async(req, res) => {
  const {rating, comment} = req.body;
  const product = await Product.findById(req.params.id);
  if(product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if(alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed.');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({message: 'Review Added'});
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
})

export const deleteProduct = asyncHandler( async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    await product.remove();
    res.status(200)
    res.json({message: 'Product removed.'})
  } else {
    res.status(404);
    throw new  Error( 'Product not found.');
  }
})