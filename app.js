const express = require("express");
const paypal = require('./paypalConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const cityRouter = require("./routes/cityRoutes");
const languageRouter = require("./routes/languageRoutes");
const genreRouter = require("./routes/genreRoutes");
const path = require('path');
const movieRouter = require("./routes/movieRoutes");
const screenRouter = require("./routes/screenRoutes")
const bookingRouter = require('./routes/bookingRoutes');
const theaterRouter = require("./routes/theaterRoutes");
const userRouter = require("./routes/userRoutes");
const showRouter = require("./routes/showRoutes");

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/city',cityRouter);
app.use('/api/v1/language',languageRouter);
app.use('/api/v1/genre',genreRouter);
app.use('/api/v1/movie',movieRouter);
app.use('/api/v1/screens',screenRouter);
app.use('/api/v1/bookings',bookingRouter);
app.use('/api/v1/theater',theaterRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/shows',showRouter);


app.get('/pay', (req, res) => {
    // Create payment
    let pay = '2.00'
    const payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
      },
      transactions: [{
        amount: {
          total: pay,
          currency: 'USD'
        },
        description: 'Payment for service'
      }]
    };
  
    // Make a request to PayPal to create a payment
    paypal.payment.create(payment, (error, payment) => {
      if (error) {
        console.log(error);
        res.send('Payment failed');
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  });
  
  // Success route after payment approval
  app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    // Execute payment after approval
    const execute_payment_json = {
      payer_id: payerId
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        console.log(error);
        res.send('Payment execution failed');
      } else {
        res.send('Payment success');
      }
    });
  });
  
  // Cancel route if user cancels payment
  app.get('/cancel', (req, res) => {
    res.send('Payment canceled');
  });


module.exports = app;