var express = require('express');
var router = express.Router();

var users = require('./../inc/users')

router.get('/', function (req, res, next) {

    res.render('admin/index', {



    });

});


router.get('/login', function (req, res, next) {

    users.render(req, res, null);

});

router.get('/contacts', function (req, res, next) {

    res.render('admin/contacts', {



    });

});

router.get('/menus', function (req, res, next) {

    res.render('admin/menus', {



    });

});

router.get('/reservations', function (req, res, next) {

    res.render('admin/reservations', {

        date: {}

    });

});

router.get('/users', function (req, res, next) {

    res.render('admin/users', {



    });

});

router.get('/emails', function (req, res, next) {

    res.render('admin/emails', {



    });

});

// ======================================
// post Methods
// ======================================

router.post('/login', function(req, res, next) {

    if (!req.body.email) {

        console.log('\nemail errado\n');
        users.render(req, res, 'Type your email');

    } else if (!req.body.password) {

        console.log('\nsenha errada\n');
        users.render(req, res, 'Type your password');

    } else {

        console.log('\nAcertou email e senha ou..\n');

        users.login(req.body.email, req.body.password)
            .then(user => {

                req.session.user = user;

                res.redirect('/admin');

            })
            .catch(err => {

                console.log('login errado\n');
                users.render(req, res, 'Email or password invalid');

            });

    }


});


module.exports = router;