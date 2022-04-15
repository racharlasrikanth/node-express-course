const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    updateOrder
} = require('./../controllers/orderController');
const {
    authenticateUser,
    authorizePermissions
} = require('./../middlewares/authentication');

router
    .route('/')
    .post(authenticateUser, createOrder)
    .get(authenticateUser, authorizePermissions('admin'), getAllOrders);

router
    .route('/showAllMyOrders')
    .get(authenticateUser, getCurrentUserOrders);

router
    .route('/:id')
    .get(authenticateUser, getSingleOrder)
    .patch(authenticateUser, updateOrder);


module.exports = router;