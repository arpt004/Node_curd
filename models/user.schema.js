const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
/*     __v:{ 
        type: Number, select: false
    } */
});

module.exports = mongoose.model('mytable', userSchema);
