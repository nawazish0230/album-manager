const express = require('express');
const router = express.Router();

const genreModel = require('../model/genreModel');

router.get('/', (req, res, next)=>{
    genreModel.find({})
                .then(genre=>{
                    // console.log(genre);
                    res.render('genres/index' , {genre: genre});
                })
                .catch((err)=>{
                    console.log(err);
                })
})

router.get('/add', (req, res, next)=>{
    res.render('genres/add');
})


// showing the details in details page
router.post('/add', (req, res, next)=>{
    genreModel.create({
        name: req.body.name
    })
    .then((genreCreated)=>{
        // console.log(genreCreated);
        req.flash('success_msg', 'Genre saved');
        res.redirect('/genres');
    })
    .catch((err)=>{
        console.log(err);
    })
})

// edit the genres
router.get('/edit/:id', (req, res)=>{
    genreModel.findById({_id: req.params.id})
    .then(singleGenre=>{
        console.log(singleGenre);
        res.render('genres/edit' , {singleGenre: singleGenre});
    })
    .catch((err)=>{
        console.log(err);
    })
})

// updating the genres
router.post('/edit/:id', (req, res)=>{
    genreModel.findOneAndUpdate({ _id:req.params.id },{
        $set: {name: req.body.name}
    }, {new: true})
    .then((genreUpdated)=>{
        console.log(genreUpdated);
        req.flash('success_msg', 'Genre updated');
        res.redirect('/genres');
    })
    .catch((err)=>{
        console.log(err);
    })
})

// deleting genre
router.post('/:id', (req, res)=>{
    genreModel.findByIdAndRemove(req.params.id)
    .then((genreDeleted)=>{
        console.log(genreDeleted);
        req.flash('success_msg', 'Genre deleted');
        res.redirect('/genres');
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router;