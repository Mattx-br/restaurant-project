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

    },
    
    getContacts() {

        return new Promise((s, f) => {

            conn.query('SELECT * FROM tb_contacts ORDER BY name', (err, result) => {

                if (err) {

                    f(err);

                }

                s(result);

            });

        });

    },
    
    delete(id) {

        return new Promise((resolve, reject) => {
            console.log('id', id);
            conn.query(`
                DELETE FROM tb_contacts WHERE id = ?
            `, [
                id
            ], (err, result) => {

                if (err) {
                    console.log('(sucesso)dentro da promise tentando deleter contato:', results);

                    reject(err);

                } else {
                    console.log('(falhou)dentro da promise tentando deleter contato:', err);

                    resolve(result)

                }

            });

        });

    }

};