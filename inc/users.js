var conn = require("./db");

module.exports = {

    render(req, res, error) {

        res.render('admin/login', {

            body: req.body,
            error

        });

    },

    login(email, password) {

        return new Promise((resolve, reject) => {

            conn.query(`
            SELECT * FROM tb_users WHERE email = ?
            `, [
                    email
                ],
                (err, result) => {

                    if (err) {

                        reject(err);

                    } else {

                        if (!result.length > 0) {

                            reject('User or password incorrect.')

                        } else {

                            let row = result[0];

                            if (row.password !== password) {

                                reject('User or password incorrect.')

                            } else {

                                resolve(row);

                            }


                        }


                    }

                })

        });

    },

    getUsers() {

        return new Promise((s, f) => {

            conn.query('SELECT * FROM tb_users ORDER BY name', (err, result) => {

                if (err) {

                    f(err);

                }

                s(result);

            });

        });

    },

    save(fields, files) {

        return new Promise((resolve, reject) => {

            let query, queryPhoto = '',
                params = [
                    fields.name,
                    fields.email,
                ];

            if (parseInt(fields.id) > 0) {
                // update

                params.push(fields.id);

                query = `
                    UPDATE tb_users
                    SET name = ?,
                        email = ?
                        WHERE id = ?
                `;

            } else {

                // create

                query = `
            
                INSERT INTO tb_users (name, email, password)
                VALUES (?, ?, ?)
                    `;

                params.push(fields.password);
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
                DELETE FROM tb_users WHERE id = ?
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

};