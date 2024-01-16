import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderErrorMessage();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const currEl = currElements[i];

            // Update texts only
            if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '')
                currEl.textContent = newEl.textContent;

            // Update attributes only
            if (!newEl.isEqualNode(currEl))
                Array.from(newEl.attributes).forEach(attr => {
                    currEl.setAttribute(attr.name, attr.value);
                });
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg> <use href="${icons}#icon-loader"></use> </svg>
            </div>
        `
    
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSuccessMessage(message = this._successMssg) {
        const error = `
            <div class="initCard msg">
                <div> <svg> <use href="${icons}#icon-smile"></use> </svg> </div>
                <p class="initText"> ${message} :) </p>
            </div>
        `

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',error);
    }

    renderErrorMessage(message = this._errorMssg) {
        const error = `
            <div class="errorCard msg">
                <div> <svg> <use href="${icons}#icon-alert-triangle"></use> </svg> </div>
                <p class="initText"> ${message} :( </p>
            </div>
        `

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',error);
    }
};