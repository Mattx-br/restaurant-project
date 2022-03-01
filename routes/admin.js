var express = require('express');
var router = express.Router();

var users = require('./../inc/users')
var admin = require('./../inc/admin')
var menus = require('./../inc/menus');

// middleware
router.use(function(req, res, next) {

    console.log('\nMiddleWare', req.url + '\n\n');

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {

        res.redirect('/admin/login');

    } else {

        next();

    }

    // res.render('admin/index');


    // console.log('batata', req.session, '\n\n');
    // req.session.user = { name: 'batata' }
    console.log('nome do cara', req.session.user);

    // console.log('menus:', req.menus);



});

router.use(function(req, res, next) {

    req.menus = admin.getMenus(req);

    // console.log('menus do ap.use:', req.menus);
    next();

});


// GET Methods

router.get('/logout', function(req, res, next) {

    delete req.session.user;

    // console.log('user dps de deletar', req.session.user + '\n\n');


    // console.log('\nMiddleWare', req.url + '\n\n');

    res.redirect('/admin/login');

})

router.get('/', function(req, res, next) {

    // res.render('admin/index', admin.getParams(req, { data }));
    // req.session.user = { name: 'batata' }

    // res.render('admin/index', { name: 'batata', data });

    admin.dashboard().then(data => {

        res.render('admin/index', admin.getParams(req, {
            data
        }));

    }).catch(err => { console.log(err) });

});


router.get('/login', function(req, res, next) {

    users.render(req, res, null);

});

router.get('/contacts', function(req, res, next) {

    res.render('admin/contacts', admin.getParams(req));

});

router.get('/menus', function(req, res, next) {

    menus.getMenus().then(data => {

        res.render('admin/menus', admin.getParams(req, {
            data
        }));

    });
});

router.get('/reservations', function(req, res, next) {

    res.render('admin/reservations', admin.getParams(req, {

        date: {}

    }));

});

router.get('/users', function(req, res, next) {

    res.render('admin/users', admin.getParams(req));

});

router.get('/emails', function(req, res, next) {

    res.render('admin/emails', admin.getParams(req));

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

                // res.render('/admin')
                res.redirect('/admin');

            })
            .catch(err => {

                console.log('login errado\n');

                // res.redirect('/admin/login');

                users.render(req, res, 'Email or password incorrect.');

                // users.render(req, res, 'Email or password invalid');

            });

    }

});


router.post('/menus', function(req, res, next) {

    menus.save(req.fields, req.files)
        .then(results => {

            res.send(results);

        })
        .catch(err => { res.send(err); });

    // res.send(req.body);

});

module.exports = router;