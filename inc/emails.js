var conn = require("./db");
module.exports = {

    getEmails() {
        return new Promise((resolve, reject) => {

            conn.query('SELECT * FROM tb_emails ORDER BY email', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })

        });
    },
    delete(id) {

        return new Promise((resolve, reject) => {

            conn.query(`
                DELETE FROM tb_emails WHERE id = ?
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

    },
    save(req) {
        return new Promise((resolve, reject) => {

            console.log('\n\n\n\nreq:', req.fields);

            if (!req.fields.email) {
                reject('Please enter a valid email');
                // res.send({
                //     error: 'Please enter a valid email'
                // });
            }
            else {
                conn.query(`
                INSERT INTO tb_emails (email)
                VALUES (?)
                 `, [
                    req.fields.email
                ], (err, result) => {
                    if (err) {
                        reject(err.message);
                    }
                    else{
                        resolve(result);
                    }
                });
            }

        });
    }

};