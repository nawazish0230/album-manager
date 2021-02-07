const mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('genre', genreSchema);