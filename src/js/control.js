// https://forkify-api.herokuapp.com/v2
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

if (module.hot) {
    module.hot.accept();
}

const controlRecipe = async function () {
    try {

        const id = window.location.hash.slice(1);
        // const id = '5ed6604591c37cdc054bc886';

        if (!id) return;
        recipeView.renderSpinner();

        // 0) Update resultsView to mark the active recipe
        resultsView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookmarks);

        // 1) Recipe Loading
        await model.loadRecipe(id);

        // 2) Recipe Rendering
        recipeView.render(model.state.recipe);

    } catch (err) {
        // alert(err);
        console.log(err);
        recipeView.renderErrorMessage();
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        // Get search query
        const query = searchView.getQuery();

        if (!query)
            return;

        // load search result
        await model.loadSearchResults(`${query}`);

        // render search results
        // resultsView.render(model.state.search.results);
        resultsView.render(model.getSearchResultsPage());

        // render initial pagination
        paginationView.render(model.state.search);

    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (page) {
    // console.log('Page Controller');
    // Render NEW results
    resultsView.render(model.getSearchResultsPage(page));

    // Render NEW buttons
    paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings);

    // Update the recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {

    // 1) Add / Remove bookmark
    if (!model.state.recipe.bookmarked)
        model.addBookmark(model.state.recipe);
    else
        model.deleteBookmark(model.state.recipe.id);

    // 2) Update Recipe View
    recipeView.update(model.state.recipe);

    // 3) Render Bookmarks
    bookmarksView.render(model.state.bookmarks);
};

const controllingOldBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipeData) {
    try {
        // Rendering Spinner
        addRecipeView.renderSpinner();

        //Upload new recipe data
        await model.uploadRecipe(newRecipeData);

        // Render new Recipe
        recipeView.render(model.state.recipe);

        // Sucess message
        addRecipeView.renderSuccessMessage();

        // Render bookmark view
        bookmarksView.render(model.state.bookmarks);

        // Change ID in URL
        window.history.pushState(null, '', `#${model.state.recipe.id}`);

        // close form window
        setTimeout(function () {
            addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC * 1000)

    } catch (err) {
        console.log(err);
        addRecipeView.renderErrorMessage(err.message);
    }
}

const init = function () {
    bookmarksView.addHandlerRenderBookmarks(controllingOldBookmarks)
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlBookmarks);
    recipeView.renderSuccessMessage();
    searchView.addHandlerSearch(controlSearchResults);
    paginationView._addHandlerClickPage(controlPagination);
    addRecipeView._addHandlerSubmitForm(controlAddRecipe);
};
init();