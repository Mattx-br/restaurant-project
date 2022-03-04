class HcodeGrid {

    constructor(configs) {

        configs.listeners = Object.assign({
            afterUpdateClick: (e => {

                $('#modal-update').modal('show');

            }),
            afterDeleteClick: (e => {

                window.location.reload();

            }), 
            afterFormCreate: (e => {

                console.log('resolveu a promise do save formCreate');

                // window.location.reload();

            }), 
            afterFormUpdate: (e => {

                console.log('resolveu a promise do save formUpdate');

                // window.location.reload();

            }),afterFormCreateError: (e => {

                console.log('\n\nerro ao salvar o create', err, '\n\n\n');

                // window.location.reload();

            }), afterFormUpdateError: (e => {

                console.log('\n\nerro ao salvar o update', err, '\n\n\n');

                // window.location.reload();

            }) 
        }, configs.listeners)

        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete'

        }, configs);

        this.initForms();
        this.initButtons();

    }

    initForms() {

        // Create form

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json => {

            this.fireEvent('afterFormCreate')


        })
            .catch(err => {

                this.fireEvent('afterFormCreateError')

            });

        // *** Create form

        // Update form

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save()
            .then(json => {

                this.fireEvent('afterFormUpdate')

            })
            .catch(err => {

                this.fireEvent('afterFormUpdateError')

            });

        // *** Update form

    }

    fireEvent(name, args) {

        if (typeof this.options.listeners[name] === 'function') {
            this.options.listeners[name].apply(this, args);
        }
    }

    getTrData(e) {

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

        return JSON.parse(tr.dataset.row);

    }


    initButtons() {

        var editButtons = [...document.querySelectorAll(this.options.btnUpdate)]

        editButtons.forEach(btn => {

            btn.addEventListener('click', e => {

                this.fireEvent('beforeUpdateClick', [e]);

                let data = this.getTrData(e);

                for (let name in data) {

                    this.options.onUpdateLoad(this.formUpdate, name, data);

                }


                this.fireEvent('afterUpdateClick', [e]);

            });

        });


        // Delete reservation

        [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {

            btn.addEventListener('click', e => {

                this.fireEvent('beforeDeleteClick');

                let data = this.getTrData(e);

                if (confirm(eval('`' + this.options.deleteMsg + '`'))) {

                    fetch(eval('`' + this.options.deleteUrl + '`'), {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(json => {

                            this.fireEvent('afterDeleteClick', [e]);

                        });

                }

            });

        });

        // *** Delete reservation

    }

}