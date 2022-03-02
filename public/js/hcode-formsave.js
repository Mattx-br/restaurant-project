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
                    response.json();
                    // console.log(response.json());
                })
                .then(json => {

                    resolve(json);

                })
                .catch(err => {

                    reject(err);

                });

        });

    });
}