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

            console.log('entrou na promessa');

            if (fields.date.indexOf('/') > -1) {

                console.log('entrou no if do date');

                let date = fields.date.split('/');
                fields.date = `${date[2]}-${date[1]}-${date[0]}`;

                console.log('date:', date);
            }

            let query = '';

            console.log('query:', query);
            console.log('fields:', fields);

            let params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ];
            console.log('params:', params);

            console.log('\n\n2  query:', query, '\n\nparams: ', params);




            if (parseInt(fields.id) > 0) {

                query = `
                UPDATE tb_reservations
                SET
                name = ?,
                email = ?,
                people = ?,
                date = ?,
                time = ?
                WHERE id = ?
                
                `;

                params.push(fields.id);

            }
            else {

                console.log('entrou no create reservation');

                query = `
                INSERT INTO tb_reservations (name, email, people, date, time)
                VALUES(?, ?, ?, ?, ?)
                `;
            }

            console.log('\n\nquery:', query, '\n\nparams: ', params);

            conn.query(query, params, (err, result) => {

                if (err) {

                    reject(err);

                } else {
                    resolve(result);
                }

            });

        });
    }


};