const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const subscribeController = require('./controller/subscribeController');
const applicantController = require('./controller/applicantController');
const authController = require('./controller/markerController');
const errorController = require('./controller/errorController');
const appError = require('./utils/appError');
const cookieParser = require('cookie-parser');
const Subscriber = require('./models/subscriberModel');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const app = express();
const GlobalUserName = require('./utils/userName');

// 🔰 MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware to parse cookies
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'your-secret-key', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(GlobalUserName);

//🔰 ROUTES
app
  .route('/subscribe')
  .get((req, res) => {
    Subscriber.find().then(arr => {
      //console.log(arr);
      res.render('subscribe', { arr });
    });
  })
  .post(subscribeController.addUser);
app.route('/apply').get(authController.protect, applicantController.getAllCVs).post(upload.array('files'), applicantController.sendCV);

app.route('/login').get(authController.getLogin).post(authController.postLogin);
app.route('/').get((req, res) => {
  res.status(200).render('layout');
});

app.route('/allUsers').get(authController.protect, authController.getAllUsers);

app.route('/signup').post(authController.signup);
app.route('/forgotPassword').post(authController.forgotPassword);
app.route('/resetPassword/:token').get(authController.resetPassword);

app.get('/', (req, res) => {
  res.render('layout');
});

app.get('/logout', (req, res) => {
  // Clear the cookie by setting its expiration date to the past
  res.clearCookie('token'); // Replace 'token' with the name of your cookie
  res.clearCookie('username'); // Replace 'token' with the name of your cookie
  delete res.locals.username;
  res.redirect('/'); // Redirect to the login page or wherever you want
});

app.all('*', (req, res, next) => {
  // const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  // error.status = 'fail';
  // error.statusCode = 404;

  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
