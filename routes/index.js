var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var router = express.Router();

var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts')

/* GET home page. */
router.get('/', function(req, res, next) {

    menus.getMenus().then(result => {

        res.render('index', {
            title: 'Restaurante Saboroso!',
            menus: result,
            isHome: true
        });

    });

});

router.get('/contacts', function(req, res, next) {

    contacts.render(req, res);

});



router.get('/menus', function(req, res, next) {

    menus.getMenus().then(result => {

        res.render('menus', {
            title: 'Menu - Restaurante Saboroso!',
            background: 'images/img_bg_1.jpg',
            h1: 'Enjoy our menu!',
            menus: result,
            isHome: false
        });

    });

});



router.get('/reservations', function(req, res, next) {

    reservations.render(req, res);

});



router.get('/services', function(req, res, next) {

    res.render('services', {
        title: 'Services - Restaurante Saboroso!',
        background: 'images/img_bg_1.jpg',
        h1: 'É um prazer poder servir!',
        isHome: false
    });

});


// POST methods

router.post('/reservations', function(req, res, next) {
 
    if (!req.body.name) {
        reservations.render(req, res, 'Type your name');
    } else if (!req.body.email) {
        reservations.render(req, res, 'Type your email');
    } else if (!req.body.people) {
        reservations.render(req, res, 'Select how many people');
    } else if (!req.body.date && ((Date.now() - req.body.date) > 0)) {
        reservations.render(req, res, 'Select the date');
    } else if (!req.body.time) {
        reservations.render(req, res, 'Select the hour');
    } else {

        reservations.save(req.body).then(result => {

            req.body = {};

            reservations.render(req, res, null, 'Reservation registered');

        }).catch(err => {

            reservations.render(req, res, err.message);


        });
        // res.send(req.body);

    }

});

router.post('/contacts', function(req, res, next) {

    console.log(req.body);

    if (!req.body.name) {
        contacts.render(req, res, 'Type your name');
    } else if (!req.body.email) {
        contacts.render(req, res, 'Type your email');
    } else if (!req.body.message) {
        contacts.render(req, res, 'Type your message');
    } else {

        contacts.save(req.body)
            .then(result => {

                req.body = {};
                contacts.render(req, res, null, 'Contact sended!')

            })
            .catch(err => { contacts.render(req, res, err.message) });

    }


});


module.exports = router;