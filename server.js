const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport')

const userModel = require('./model/userModel');
// model file
const genreModel = require('./model/genreModel');

mongoose.connect('mongodb+srv://nawaz0230:nawaz0230@cluster0-ul74t.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
        .then(() => {
          console.log('database connected')
        })
        .catch(err => console.log(err))

// Routes files
const routes = require('./routes/index');
const albums = require('./routes/albums');
const genres = require('./routes/genres');
const users = require('./routes/users');

// init app
const app = express();

// view engine
app.set('views', path.join(__dirname ,'views'));
app.set('view engine', 'ejs');

// logger
app.use(logger('dev'));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// handle session
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'secret'
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   userModel.findById(id, function(err, user) {
//       done(err, user);
//   });
// });

// validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


// connect flash
app.use(flash());

// global vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.isLogged = req.isAuthenticated();
    console.log(req.loggedInUser)
    next();
})
// Routes
app.use('/', routes);
app.use('/albums', albums);
app.use('/genres', genres);
app.use('/users', users);

// ports
app.set('port', (process.env.PORT || 3000));

// run server
app.listen(app.get('port'), function(){
    console.log('server is running on port:' + app.get('port'));
})



// when updating the albums the image issue and it creates new updated album and previous one was not deleted
// delete of genre is not working as ajax manner same in album
// how to use function globally isLoggedIn
// show the logout to loggedin user and login, register to not logged in user
// separate the album colllection only one can see their collections not others
// show the login and register in 12 columns to the not logged in user