let conn = require('./db');
let path = require('path');
module.exports = {

    getMenus() {

        return new Promise((s, f) => {

            conn.query('SELECT * FROM tb_menus ORDER BY title', (err, result) => {

                if (err) {

                    f(err);

                }

                s(result);

            });

        });

    },

    save(fields, files) {

        return new Promise((resolve, reject) => {

            fields.photo = `images/${path.parse(files.photo.path).base}`;

            conn.query(`
            
            INSERT INTO tb_menus (title,description, price, photo)
            VALUES (?, ?, ?, ?)
                `, [
                fields.title,
                fields.description,
                fields.price,
                fields.photo
            ], (err, results) => {

                if (err) { reject(err); } else { resolve(results); }

            });

        });


    }

}