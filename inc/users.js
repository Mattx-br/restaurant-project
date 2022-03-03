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

                        reject(`Erro genérico: ${err}`);

                    } else {

                        if (!result.length > 0) {

                            reject('User or password incorrect. 1')

                        } else {

                            let row = result[0];

                            if (row.password !== password) {

                                reject('User or password incorrect. 2')

                            } else {

                                resolve(row);

                            }


                        }


                    }

                })

        });

    }

};