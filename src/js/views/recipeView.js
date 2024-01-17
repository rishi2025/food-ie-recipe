import View from './View.js';
import {Fraction} from 'fractional';
import icons from 'url:../../img/icons.svg';

class RecipeView extends View {
    _parentElement = document.querySelector('.right');
    _errorMssg = 'Could not find the Recipe, please try another one..';
    _successMssg = 'Start by searching for a recipe or an ingredient. Have fun!';

    addHandlerRender(handler) {
        window.addEventListener('hashchange', handler);
        window.addEventListener('load', handler);
    }

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.rec');

            if (!btn)
                return;

            const { updateTo } = btn.dataset;

            if (+updateTo > 0)
                handler(+updateTo);
        });
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.recBookmark');

            if (!btn) return;
            handler();
        });
    }

    _generateMarkup() {
        const markup = 
        `
            <div class="recipeContent">
                <div class="recipe">
                    <figure class="recipeFig">
                        <img src="${this._data.image}" alt="${this._data.title}" class="recipeImg">
                        <h1 class="recipeTitle">
                            <span>${this._data.title}</span>
                        </h1>
                    </figure>
                    <div class="recipeCalc">
                        <div class="recipeTime">
                            <div class="recipeTimeIcon rec">
                                <svg> <use href="${icons}#icon-clock"></use> </svg>
                            </div>
                            <div class="recipeTimeValue"> ${this._data.cookingTime} </div>
                            <div class="recipeTimeUnit"> MINUTES</div>
                        </div>

                        <div class="recipeQuantity">
                            <div class="recipeQuantityIcon rec">
                                <svg> <use href="${icons}#icon-users"></use> </svg>
                            </div>
                            <div class="recipeQuantityValue">  ${this._data.servings} </div>
                            <div class="recipeQuantityUnit"> SERVINGS</div>
                        </div>

                        <div class="plusMinus">
                            <div class="increaseServing rec" data-update-to="${this._data.servings - 1}">
                                <svg> <use href = "${icons}#icon-minus-circle"></use></svg>
                            </div>
                            <div class="decreaseServing rec" data-update-to="${this._data.servings + 1}">
                                <svg> <use href = "${icons}#icon-plus-circle"></use></svg>
                            </div>
                        </div>

                        <div class="recipePrsnl">
                            <div class="recipeUser rec 
                            ${this._data.key ? '' : 'hidden'}
                            ">
                                <svg> <use href = "${icons}#icon-user"></use></svg>
                            </div>
                            <div class="recipeBookmark recBookmark">
                                <svg> <use href = "${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use></svg>
                            </div>
                        </div>
                    </div>
                    <div class="recipeIngredients">
                        <h1 class="recipeIngredientsTitle">
                            RECIPE INGREDIENTS
                        </h1>
                        <div class="ingredients">

                            ${this._data.ingredients.map(this._generateMarkupIngredient).join('')};
                        </div>
                    </div>
                    <div class="recipeDirections">
                        <h1 class="recipeIngredientsTitle">
                            HOW TO COOK IT
                        </h1>

                        <div class="directionsDescription">
                            This recipe was carefully designed and tested by 
                            <span class="author"> ${this._data.publisher}</span>
                            . Please check out directions at their website.
                        </div>

                        <a href = "${this._data.sourceUrl}">
                            <button class="visitRecipe"> DIRECTIONS &#8594; </button>
                        </a>
                    </div>
                </div>
            </div>
        `

        return markup;
    }

    _generateMarkupIngredient(ing) {
        return `
            <div class="ingredientPart rec">
            <svg> <use href = "${icons}#icon-check"></use></svg>
            <div class="ingredientText">
                <div class="ingredientValue">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
                <div class="ingredientUnit">${ing.unit}</div>
                <div class="ingredientDescription">${ing.description}</div>
            </div>
            </div>
        `
    }
};

export default new RecipeView();