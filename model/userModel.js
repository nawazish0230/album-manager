const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'album'
    }
});
userSchema.plugin(plm);
module.exports = mongoose.model('user', userSchema);