import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
    _parentElement = document.querySelector('.main');
    _errorMssg = 'No recipes found for your query! Please try another one.. :)';

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(result) {
        const id = window.location.hash.slice(1);

        return `
            <li class="mainRecipes ${(id === result.id) ? 'activeRecipe' : ''}">
                <a class="previewLink" href="#${result.id}">
                    <figure class="previewFigure"> <img class="previewImg" src = "${result.image}"> </figure>
                    <div class="previewInfo">
                        <div class="previewDish"> ${result.title} </div>
                        <div class="previewAuthor"> ${result.publisher} </div>
                    </div>
                    <div class ="userIcon
                    ${result.key ? '' : 'hidden'}
                    "> <svg> <use href="${icons}#icon-user"></use> </svg> </div>
                </a>
            </li>
        `;
    }
};

export default new ResultsView();