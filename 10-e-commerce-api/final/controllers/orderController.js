const Product = require('./../models/Product');
const Order = require('./../models/Order');

const CustomError = require('./../errors');
const { StatusCodes } = require('http-status-codes');
const { checkPermissions } = require('./../utils');

const fakeStripeAPI = async ({amount, currency}) => {
    const client_secret = 'someRandomValue'
    return {
        client_secret, amount
    }
}

const createOrder = async (req, res) => {
    const {items:cartItems, tax, shippingFee} = req.body;

    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }

    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shippingFee');
    }

    let orderItems = [];
    let subtotal = 0;

    // this is async operation so we need to use forOfLoop instead of forEach and Map() methods
    for (const item of cartItems) {
        const dbProduct = await Product.findOne({_id: item.product});
        if (!dbProduct) {
            throw new CustomError.NotFoundError(`No product with id : ${item.product}`);
        }
        const {name, price, image, _id} = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            product:_id,
            image
        };
        // add item to orderItems
        orderItems = [...orderItems, singleOrderItem];
        // calculate subtotal
        subtotal += item.amount * price;
    }
    // calculate total
    const total = tax + shippingFee + subtotal;
    // GET CLIENT SECRET => STRYPE (fake library usign as of now)
    const paymentIntentId = await fakeStripeAPI({
        amount:total,
        currency: 'usd'
    })

    const order = await Order.create({
        orderItems, 
        total, 
        subtotal, 
        tax, 
        shippingFee, 
        clientSecret:paymentIntentId.client_secret, 
        user:req.user.userId
    });

    res.status(StatusCodes.CREATED).json({order, clientSecret:order.clientSecret});
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({count:order.length, orders});
}

const getSingleOrder = async (req, res) => {
    const {id:orderId} = req.params;

    const order = await Order.find({_id:orderId});

    if (!order) {
        throw new CustomError.NotFoundError(`No Order with id : ${orderId}`);
    }

    // check current user having persmisson or not for the requsted resource
    checkPermissions(req.user, order.user);

    res.status(StatusCodes.OK).json({order});
}

const getCurrentUserOrders = async (req, res) => {

    const currentUserOrders = await Order.find({user:req.user.userId});

    res.status(StatusCodes.OK).json({count:currentUserOrders.length, orders:currentUserOrders})
}

const updateOrder = async (req, res) => {
    const {id:orderId} = req.params;
    const {paymentIntentId} = req.body;

    const order = await Order.find({_id:orderId});

    if (!order) {
        throw new CustomError.NotFoundError(`No Order with id : ${orderId}`);
    }

    // check current user having persmisson or not for the requsted resource
    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    await order.save();

    res.status(StatusCodes.OK).json({order});
}

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder
}