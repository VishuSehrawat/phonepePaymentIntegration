const express = require("express");
const {
  initiateOrder,
  checkOrderStatus,
  createSDKorder,
} = require("../controllers/paymentControllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/initiateOrder", initiateOrder);
paymentRouter.post("/createSDKorder",createSDKorder)
paymentRouter.post("/checkOrderStatus", checkOrderStatus);


module.exports =  paymentRouter 