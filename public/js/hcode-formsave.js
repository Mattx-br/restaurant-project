HTMLFormElement.prototype.save = function() {

    let form = this;

    return new Promise((resolve, reject) => {

        form.addEventListener('submit', (event) => {

            event.preventDefault();

            let formData = new FormData(form);

            console.log(form);

            fetch(form.action, {
                    method: form.method,
                    body: formData
                })
                .then((response) => {

                    // setTimeout(() => {})

                    setTimeout(() => {

                        console.log('1 resolveu o response:', response);

                        console.log('response json', response.json());

                    }, 2000);


                    // response.json();

                })
                .then(json => {

                    setTimeout(() => {

                        resolve(json);

                    }, 1000)

                })
                .catch(err => {

                    reject(err);

                });

        });

    });
}