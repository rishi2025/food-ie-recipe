import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _addHandlerClickPage(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.pageBtn');

            if (!btn)
                return;

            const goToPage = Number(btn.dataset.goto);
            handler(goToPage);
        })
    }

    _generateMarkup() {
        const currPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1 and multiple page
        if (currPage === 1 && numPages > 1) {
            return `
                <button class="nextPage pageBtn" data-goto="${currPage + 1}"> 
                    Page ${currPage + 1} &#8594; 
                </button>
            `;
        }

        // Page 1 and single page
        if (currPage === 1 && numPages === 1) {
            return '';
        }

        // Last page
        if (currPage === numPages) {
            return `
                <button class="prevPage pageBtn" data-goto="${currPage - 1}">
                    &#x2190; Page ${currPage - 1} 
                </button> 
            `;
        }

        // Any other page
        if (currPage < numPages) {
            return `
                <button class="prevPage pageBtn" data-goto="${currPage - 1}">
                    &#x2190; Page ${currPage - 1} 
                </button>
                <button class="nextPage pageBtn" data-goto="${currPage + 1}"> 
                    Page ${currPage + 1} &#8594; 
                </button>
            `;
        }
    }
};

export default new PaginationView();