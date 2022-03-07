var conn = require("./db");
module.exports = {

    getEmails() {
        return new Promise((resolve, reject) => {

            conn.query('SELECT * FROM tb_emails ORDER BY email', (err, result) => {
                if (err) {
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })

        });
    }

};