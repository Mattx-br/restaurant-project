HTMLFormElement.prototype.save = function () {

    let form = this;

    // console.log('form dentro do save:', form);

    var ReserveName = form.querySelectorAll('input')[0].value;

    // console.log('\n\n\ntipo do bglh:', typeof ReserveName,'\n\n\n');

    // console.log('\n\n\nname:', ReserveName[0].value,'\n\n\n');


    return new Promise((resolve, reject) => {

        form.addEventListener('submit', (event) => {

            event.preventDefault();

            let formData = new FormData(form);

            console.log('formData:', formData);

            formData.append('name', ReserveName);

            console.log('formData:', formData);

            console.log('formData:', formData.values);


            fetch(form.action, {
                method: form.method,
                body: formData
            })
                .then((response) => {

                    console.log('1 resolveu o response:', response);

                    // response.json();
                    console.log('response json',response.json());

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