var express = require('express');
var users = require('./../inc/users');
var router = express.Router();
var admin = require('../inc/admin');

// middleware
router.use(function(req, res, next) {

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {

        res.redirect('/admin/login');

    } else {

        next();

    }
    // res.render('admin/index');

    console.log('\nMiddleWare', req.url + '\n\n');


});

router.use(function(req, res, next) {

    req.menus = admin.getMenus(req);

    next();

});


// get Methods

router.get('/logout', function(req, res, next) {

    // console.log('user', req.session.user + '\n\n');

    delete req.session.user;

    console.log('user dps de deletar', req.session.user + '\n\n');


    // console.log('\nMiddleWare', req.url + '\n\n');

    res.redirect('/admin/login');

})

router.get('/', function(req, res, next) {

    res.render('admin/index', {

        menus: req.menus

    });

});


router.get('/login', function(req, res, next) {

    users.render(req, res, null);

});

router.get('/contacts', function(req, res, next) {

    res.render('admin/contacts', {

        menus: req.menus

    });

});

router.get('/menus', function(req, res, next) {

    res.render('admin/menus', {

        menus: req.menus

    });

});

router.get('/reservations', function(req, res, next) {

    res.render('admin/reservations', {

        menus: req.menus,
        date: {}

    });

});

router.get('/users', function(req, res, next) {

    res.render('admin/users', {

        menus: req.menus

    });

});

router.get('/emails', function(req, res, next) {

    res.render('admin/emails', {

        menus: req.menus

    });

});


// post Methods
router.post('/login', function(req, res, next) {

    if (!req.body.email) {

        console.log('\nemail errado\n');
        users.render(req, res, 'Type your email');

    } else if (!req.body.password) {

        console.log('\nsenha errada\n');
        users.render(req, res, 'Type your password');

    } else {

        console.log('\nentro no else\n');

        users.login(req.body.email, req.body.password)
            .then(user => {

                req.session.user = user;

                res.redirect('/admin');

            })
            .catch(err => {

                console.log('login errado\n');
                users.render(req, res, err.message)

            });

    }


});


module.exports = router;