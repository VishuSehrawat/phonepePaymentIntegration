const { randomUUID } = require("crypto");
const { response } = require("express");
const {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest,
  CreateSdkOrderRequest,
} = require("pg-sdk-node");
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const clientVersion = process.env.CLIENT_VERSION;
const env = Env.SANDBOX;

const client = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

const initiateOrder = async (req, res) => {
  try {
    // const merchantOrderId = "newtxn123456789";
    // const amount = 100;
      // const redirectUrl = "https://satyaanshsoftech.com";
      const {merchantOrderId,amount,redirectUrl}=req.body

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount)
      .redirectUrl(`${redirectUrl}?merchantOrderId=${merchantOrderId}`)
      .build();

    await client.pay(request).then((response) => {
      const checkoutPageUrl = response.redirectUrl;
      return res.json({ success: true, redirectUrl: checkoutPageUrl });
    });

   
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `an error occurred ${error}` });
  }
};

const createSDKorder = async (req, res) => {
  try {
    const merchantOrderId = "newtxn123456789";

    const amount = 100;
    const redirectUrl = "https://satyaanshsoftech.com";

    const request = CreateSdkOrderRequest.StandardCheckoutBuilder()
      .merchantOrderId(merchantOrderId)
      .amount(amount)
      .redirectUrl(redirectUrl)
      .build();

    await client.createSdkOrder(request).then((response) => {
      const token = response.token;
      console.log(token);
      res.json({ success: true, responseFound: response });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `an error occurred ${error}` });
  }
};

const checkOrderStatus = async (req, res) => {
    try {
        console.log("inside order status")
        console.log(req.body)
        const merchantOrderId = req.body.merchantOrderId;
        console.log(merchantOrderId)

    await client.getOrderStatus(merchantOrderId).then((response) => {
      const state = response.state;
      console.log(state);
      console.log(response);
      res.json({ success: true, responseFound: response });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `an error occurred ${error}` });
  }
};

module.exports = { initiateOrder, createSDKorder, checkOrderStatus };
