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

            console.log('\n\nnome da foto:', fields.photo);

            let query, queryPhoto = '',
                params = [
                    fields.title,
                    fields.description,
                    fields.price
                ];

            if (files.photo) {
                queryPhoto = ',photo = ?';
                params.push(fields.photo);
            }

            console.log('\n\narray dos params:', params, '\n\n');

            if (parseInt(fields.id) > 0) {
                // update

                params.push(fields.id);

                query = `
                    UPDATE tb_menus
                    SET title = ?,
                        description = ?,
                        price = ?
                        ${queryPhoto}
                        WHERE id = ?
                `;

            } else {

                // create

                console.log('nome da foto:', files.photo.name);

                if (!files.photo.name || files.photo.name == '') {

                    reject('\n\nPhoto must be included\n\n');

                }
                // else{

                    
                // }
                query = `
            
                INSERT INTO tb_menus (title,description, price, photo)
                VALUES (?, ?, ?, ?)
                    `;


            }

            conn.query(query, params, (err, results) => {

                if (err) {
                    reject(err);
                    console.log('error in mysql:', err);
                } else {
                    resolve(results);
                    console.log('sucesso no mysql:', results);
                }

            });

        });


    },
    delete(id) {

        return new Promise((resolve, reject) => {

            conn.query(`
                DELETE FROM tb_menus WHERE id = ?
            `, [
                id
            ], (err, result) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                }

            });

        });

    }

}