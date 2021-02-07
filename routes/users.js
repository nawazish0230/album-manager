const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');

const userModel = require('../model/userModel');

var errors = [];
passport.use(new localStrategy(userModel.authenticate()));

router.get('/register', (req, res, next)=>{
    res.render('users/register', {errors: errors});
});


router.post('/register', (req, res, next)=>{
    const name =  req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password

    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'password do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('users/register', {errors: errors});
        // console.log(errors);
    }else{
        let newUser = new userModel({
            name: name,
            username: username,
            email: email
        });

        
        userModel.register(newUser, req.body.password)
        .then(function(userCreated){
          passport.authenticate('local')(req, res, function(){
            req.flash('success_msg', 'you are sign up and can login')
            res.redirect('/users/login', );
          })
        })
        .catch(err=>{
          console.log(err);
        })
  }



});


router.get('/login',(req, res, next)=>{
    res.render('users/login');
});


// login process
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/albums',
//     failureRedirect: '/users/login'
// }), (req, res, next) => {});

router.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.redirect('/login');
      }
  
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        // req.loggedInUser = user;
        // console.log('user from users.js', req.loggedInUser)
        req.session.loggedInUser = user;
        console.log('users from user.js', req.session.loggedInUser)
        return res.redirect('/');
      });
  
    })(req, res, next);
  });
  
  

router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/');

})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/users/register');
    }
}

module.exports = router;