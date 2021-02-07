const mongoose = require('mongoose');

let albumSchema = mongoose.Schema({
    artist: String,
    title: String,
    genre: String,
    info: String,
    year: String,
    label: String,
    tracks: Number,
    cover: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        value: 'ucyvwyfvuigbewui'
    }
});

module.exports = mongoose.model('album', albumSchema);