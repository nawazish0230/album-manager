const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    // res.render('index');
    res.redirect('/albums')
})

module.exports = router;