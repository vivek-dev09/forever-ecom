import express from 'express'
import {placeOrder,placeOrderRazorPay,placeOrderStripe,allOrders,updateStatus,userOrders, verifyStripe}  from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js' 

const orderRouter = express.Router()


//adimin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)

//user Features

orderRouter.post('/userorders',authUser,userOrders)

//verify payment

orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter