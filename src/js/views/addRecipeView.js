import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.modalWindow');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.addRecipe');
    _btnClose = document.querySelector('.btnClose');
    _successMssg = 'Recipe is successfully uploaded';

    constructor() {
        super();
        this._addHandlerShowModal();
        this._addHandlerHideModal();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowModal() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideModal() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerSubmitForm(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    _generateMarkup() {
        
    }
};

export default new AddRecipeView();