var conn = require("./db");

module.exports = {
    render(req, res, error, success) {
        res.render("reservations", {
            title: "Reservation - Restaurante Saboroso!",
            background: "images/img_bg_2.jpg",
            h1: "Order a table",
            isHome: false,
            body: req.body,
            error,
            success
        });
    },

    save(fields) {
        return new Promise((resolve, reject) => {

            let date = fields.date.split('/');

            fields.date = `${date[2]}-${date[1]}-${date[0]}`;

            conn.query(
                `
            INSERT INTO tb_reservations (name, email, people, date, time)
            VALUES(?, ?, ?, ?, ?)
            `, [
                    fields.name,
                    fields.email,
                    fields.people,
                    fields.date,
                    fields.time,
                ],
                (err, result) => {

                    if (err) {

                        reject(err);

                    } else {
                        resolve(result);
                    }

                }

            );

        });
    },
};