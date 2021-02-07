const express = require('express');
const router = express.Router();
const multer = require('multer');
// var upload = multer({ dest: './public/images/uploads' });

// for storage purpose
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      d = new Date();
      let imgname = d.getTime() + file.originalname;
      cb(null, imgname)
    }
  })
   
var upload = multer({ storage: storage })

const genreModel = require('../model/genreModel');
const albumModel = require('../model/albumModel');

router.get('/', (req, res, next)=>{
    albumModel.find({})
                .then(album=>{
                    console.log('albums user', req.session.name)
                    res.render('albums/index' , {album: album});
                })
                .catch((err)=>{
                    console.log(err);
                })
})

router.get('/add', (req, res, next)=>{
        genreModel.find({})
                    .then(genre=>{
                        res.render('albums/add' , {genre: genre});
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
})


router.post('/add', upload.single('cover') ,(req, res, next)=>{

    // check file upload
    // if(req.file){
    //     console.log('uploading file');
    //     var cover = req.file.filename;
    // }else{
    //     console.log('no file uploaded');
    //     var cover = 'noimage.jpg';
    // }

    const filename = `${req.file.filename}`;
    
    albumModel.create({
        artist: req.body.artist,
        title: req.body.title,
        genre: req.body.genre,
        info: req.body.info,
        year: req.body.year,
        label: req.body.label,
        tracks: req.body.tracks,
        cover: filename,
        // postId: req.session.loggedInUser._id.toString()
    })
    .then(albumCreated=>{
        // console.log(albumCreated);
        res.redirect('/albums');
    })
    .catch((err)=>{
        console.log(err);
    })
})


router.get('/details/:id', (req, res)=>{
    albumModel.findById({_id: req.params.id})
    .then(singleAlbum=>{
        // console.log(singleAlbum);
        res.render('albums/details' , {singleAlbum: singleAlbum});
    })
    .catch((err)=>{
        console.log(err);
    })
})


// edit the albums
router.get('/edit/:id', (req, res)=>{
    albumModel.findById({_id: req.params.id})
    .then(singleAlbum=>{
        genreModel.find({})
                    .then(genre=>{
        // console.log(singleAlbum);
        res.render('albums/edit' , {singleAlbum , genre});
    })
    })
    .catch((err)=>{
        console.log(err);
    })
})

// updating the albums
router.post('/edit/:id', upload.single('cover'), (req, res)=>{
    albumModel.findOneAndUpdate({ _id:req.params.id },
        {
            artist: req.body.artist,
            title: req.body.title,
            genre: req.body.genre,
            info: req.body.info,
            year: req.body.year,
            label: req.body.label,
            tracks: req.body.tracks,
            // cover: req.file.filename
        }
    , {new: true})
    .then((albumUpdated)=>{
        // console.log(albumUpdated);
        req.flash('success_msg', 'Album updated');
        res.redirect('/albums');
    })
    .catch((err)=>{
        console.log(err);
    })
})

// deleting album
router.post('/:id', (req, res)=>{
    albumModel.findByIdAndRemove(req.params.id)
    .then((genreDeleted)=>{
        console.log(genreDeleted);
        req.flash('success_msg', 'Genre deleted');
        res.redirect('/albums');
    })
    .catch((err)=>{
        console.log(err);
    })
})


module.exports = router;