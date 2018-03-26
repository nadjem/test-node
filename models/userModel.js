let mongoose = require('mongoose');
mongoose.Promise = global.Promise;


let userSchema = new mongoose.Schema({

    userName: {type: String, trim: true, required: true},
    password: {type: String, trim: true, required: true}

});


module.exports = mongoose.model('User', userSchema);