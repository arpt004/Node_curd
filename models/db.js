const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true }, (err) =>{
    if(!err){ console.log('Mongodb Connected') }
    else { console.log('error in connection'+err)}
});

const us = require('./user.schema')
