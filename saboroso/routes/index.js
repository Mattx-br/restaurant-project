var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    conn.query('SELECT * FROM tb_menus ORDER BY title', (err, result) => {

        if (err) {

            console.log(err);
            res.send(err);

        }

        res.render('index', {
            title: 'Restaurante Saboroso!',
            menus: result
        });

    })

});

module.exports = router;