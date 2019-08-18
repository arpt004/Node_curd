const express = require('express');
const router = express.Router();
const User = require('../models/user.schema');
const bodyParser = require('body-parser');
//var name1 = '';
var sess;



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', (req, res) => {
    res.render('login',{title:'Login'});
});

router.get('/register', (req, res) => {
    res.render('register',{title:'Register'});
});

router.post('/register', (req, res) => {
    console.log(req.body)
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    let errors = '';



    if (!name || !email || !password || !cpassword){
        errors = 'Please fill all the blocks';
    };

    if (password !== cpassword){
        errors = 'Password should match'
    };

    if (password.length < 6 ){
        errors = 'Password length should be atleast 6';
    };
    console.log(errors.length)
    
    if(errors.length < 1){
        const newUser = new User({  name,  email,  password, cpassword });
        User.findOne({email : email}, function(err, result) {
            if (err) throw err;
            console.log(result+'1')
            if (result == null){
                console.log(newUser)
                newUser.save()
                .then(user => { console.log('success_msg','You are now registered');
                res.redirect('/users/login');
                }).catch(err => console.log(err));

            }else{
                console.log('Email ID Already Exists');
                errors = 'Email ID Already Exists'
                res.render('register',{name, errors})

            }
        })

    }else{
        res.render('register',{name, email, errors})
    }

});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password1 = req.body.password
    let errors = ''

    if (!email || !password1){
        errors = 'Please fill all the blocks';
    }

    if(errors.length < 1){
     //   User.findOne({email : email, password : password1 }, function(err, result) {
          User.findOne({email : email}, function(err, result) {
            if (err) throw err;
            if (result == null){
                console.log('Email ID Already Exists');
                errors = 'Email ID NOT Exists please register first'
                res.render('login',{errors})
            }
            else{
                if(result.password == password1){
                 //   name1 = result.name

                    sess = req.session;
                    sess.email = req.body.email;
                    sess.name = result.name;
                
                    res.redirect('/users/dashboard');
         //           var name1 = result.name
         //            res.render('dashboard',{name1})             
                }else{
                    errors = 'Password is incorrect'
                    res.render('login',{errors, email})
                }
            }
        })
    }else{
        res.render('login',{errors})
    }
})

router.get('/dashboard', (req, res) => {

    sess = req.session;
    if (sess.email) {
        name1 = sess.name
        User.find((err , data) => {
            if (!err){
                res.render('dashboard',{title:'dashboard', name1, list : data});
                //res.render('Welcome.html');
            }
        })
    } else {
        res.redirect('/users/login');
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy(function (error) {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/users/login');
        }
    });

});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render('update',{title:'Update', newvar:doc})
        }
    })
})

router.post('/:id', (req, res) => {
    var errors = ''
    var a = req.body
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) =>{
        if(!err){
                errors = 'Updated'
                res.render('update',{errors, a});
            }
        else{
            res.redirect('/users/login');
        }
        
    })
});


router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/users/dashboard')
        }else{
            console.log("delete error "+err)
        }
    })
})



module.exports = router;