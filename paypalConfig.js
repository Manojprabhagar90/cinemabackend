const paypal = require('paypal-rest-sdk');
require('dotenv').config();

paypal.configure({
  'mode': 'sandbox', // 'sandbox' or 'live'
  'client_id': process.env.PAYPAL_USERNAME,
  'client_secret': process.env.PAYPAL_PASSWORD
});

module.exports = paypal;
