var conn = require("./db");


module.exports = {

    render(req, res, error, success) {

        res.render('contacts', {
            title: 'Contact - Restaurante Saboroso!',
            background: 'images/img_bg_3.jpg',
            h1: 'Talk to us!',
            isHome: false,
            body: req.body,
            error,
            success
        });


    },

    save(fields) {

        return new Promise((resolve, reject) => {

            conn.query(`
            INSERT INTO tb_contacts (name, email, message)
            VALUES (?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.message
            ], (err, result) => {

                if (err) {

                    console.log(typeof fields.message);

                    reject(err)

                } else {

                    resolve(result);

                }

            });


        });

    }

};