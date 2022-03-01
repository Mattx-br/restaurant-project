class HcodeFileReader {

    constructor(inputEl, imgEl) {

        this.inputEl = inputEl;
        this.imgEl = imgEl;

        this.initInputEvent();

    }

    initInputEvent() {

        document.querySelector(this.inputEl).addEventListener('change', e => {

            this.reader(e.target.files[0]).then(result => {

                document.querySelector(this.imgEl).src = result;

            }).catch(e => { console.log(e) });

        });

    }

    reader(file) {

        return new Promise((resolve, reject) => {

            let reader = new FileReader();

            reader.onload = function() {

                resolve(reader.result);

            }

            reader.onerror = function(e) {

                reject(`Impossible to read the image: ${e}`);

            }

            reader.readAsDataURL(file);
        });


    }

}