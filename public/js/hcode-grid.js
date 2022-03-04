class HcodeGrid {

    constructor(configs) {

        this.options = Object.assign({},{
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete'
        },configs);

        this.initForms();
        this.initButtons();

    }

    initForms() {

        // Create form

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json => {

            console.log('resolveu a promise');

            // window.location.reload();

        })
            .catch(err => {

                console.log('\n\nerro ao salvar o menu', err, '\n\n\n');

            });

        // *** Create form

        // Update form

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save()
            .then(json => {

                // window.location.reload();

            })
            .catch(err => {

                console.log('\n\nerro ao salvar o menu', err, '\n\n\n');

            });

        // *** Update form

    }

    initButtons() {

        var editButtons = [...document.querySelectorAll(this.options.btnUpdate)]

        editButtons.forEach(btn => {

            btn.addEventListener('click', e => {

                // for ubuntu
                console.log('noq cliquei: ', e.target.tagName);
                let tr = ''
                if (e.target.tagName === 'BUTTON') {
                    console.log('button', e.composedPath()[2]);
                    tr = e.composedPath()[2];
                }

                else {
                    tr = e.composedPath()[3];
                    console.log('fa- fa pencil:', e.composedPath()[3]);
                }

                // for windows
                // let tr = e.path.find(el => {
                //     return (el.tagName.toUpperCase() === 'TR');
                // });

                let data = JSON.parse(tr.dataset.row);

                for (let name in data) {

                    let input = this.formUpdate.querySelector(`[name=${name}]`);

                    switch (name) {

                        case 'date':
                            if (input) input.value = moment(data[name]).format('YYYY-MM-DD');

                            console.log('pq n carrega:', moment(data[name]).format('YYYY-MM-DD'));
                            break;
                        default:
                            if (input) input.value = data[name];
                            break;
                    }

                }

                $('#modal-update').modal('show');
            });

        });


        // Delete reservation

        [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {

            btn.addEventListener('click', e => {

                // for ubuntu
                let tr = ''
                if (e.target.tagName === 'BUTTON') {
                    console.log('button', e.composedPath()[2]);
                    tr = e.composedPath()[2];
                }

                else {
                    tr = e.composedPath()[3];
                    console.log('fa- fa pencil:', e.composedPath()[3]);
                }

                // for windows 
                // let tr = e.composedPath()[2].find(el => {
                //     return (el.tagName.toUpperCase() === 'TR');
                // });

                let data = JSON.parse(tr.dataset.row);

                if (confirm(eval('`' + this.options.deleteMsg + '`'))) {

                    fetch(eval('`' + this.options.deleteUrl + '`'), {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(json => {

                            window.location.reload();

                        });

                }

            });

        });

        // *** Delete reservation

    }

}