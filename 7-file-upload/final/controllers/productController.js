const Product = require("./../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
    res.send('create product');
}

const getAllProducts = async (req, res) => {
    res.send('list of products');
}

module.exports = {
    createProduct,
    getAllProducts
}