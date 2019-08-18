const express = require("express");
const app = express();
const Path = require('path');
var exphbs  = require('express-handlebars');
const session = require('express-session');
const mdb = require('./models/db');


app.use(session({ secret: 'pswd', saveUninitialized: true, resave: true }));


//app.use(express.static(Path.join(__dirname, 'layouts')));
app.engine('handlebars', exphbs({defaultLayouts: 'main'}));
app.set('view engine', 'handlebars');


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/route'));

app.listen(3000, () => {
    console.log('Server is listening to the port 3000')
})
//http://localhost:3000/

