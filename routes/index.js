const express = require('express');
const router = express.Router();


router.get('/welcome', (req, res) => {
    res.render('Welcome',{title:'Welcome'});
    //res.render('Welcome.html');
});

module.exports = router;