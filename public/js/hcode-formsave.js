HTMLFormElement.prototype.save = function() {

    let form = this;

    return new Promise((resolve, reject) => {

        form.addEventListener('submit', (event) => {

            event.preventDefault();

            let formData = new FormData(form);

            fetch(form.action, {
                    method: form.method,
                    body: formData
                })
                .then((response) => {
                    console.log('acão do form:', form);
                    console.log('entrou no primeiro then:');
                    response.json();
                    // console.log('resposta do save do form: ',response.json());
                })
                .then(json => {

                    console.log('entrou no segundo then:',json);

                    resolve(json);

                })
                .catch(err => {

                    reject(err);

                });

        });

    });
}