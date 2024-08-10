import { fetchFilterList, fetchFilteredItems, fetchRecipeThroughID } from "./recipeFetcher.js";
import { Recipe } from "./recipe.js";
import { createGoBackFromRecipeButton, createMetaFieldset, createRecipeArticle, getFilter, makeRecipeThumbnails } from "./html_formatter.js";

const FILTER_MAIN = document.querySelector('.filter_main');
const categoryChar = 'a';

const FILTER_BY_H2 = document.createElement('h2');
FILTER_BY_H2.id = 'filter_h2';

let flex_ul;

let filtered_items_ul;


const BACK_BUTTON = document.createElement('button');
BACK_BUTTON.innerText = 'goBack();';

let filterType;

const filterTypeMap = new Map([
    ['cuisine', 'a'],
    ['ingredient', 'i'],
    ['recipeCategory', 'c']
]);


getFilterType();

const filterList = await fetchFilterList(getFilterChar());


showCuisineFilters().then( () => {
    addEventListeners();
}
);


function getFilterType() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    filterType = urlParams.get('filter');
}

function addEventListeners() {

    flex_ul.childNodes.forEach((node) => {
        node.addEventListener('click', displayFilteredItems);
    });

    BACK_BUTTON.addEventListener('click', goBack);

    
}

function getFilterChar() {
    return filterTypeMap.get(filterType);
}

async function showCuisineFilters() {
    
    FILTER_BY_H2.innerText = 'Filter by ' + filterType;
 
    FILTER_MAIN.appendChild(FILTER_BY_H2);
    flex_ul = getFilter(filterList, filterType);
    FILTER_MAIN.appendChild(flex_ul); 
}

async function displayFilteredItems(event) {
    
    let filteredItems = await fetchFilteredItems(getFilterChar(), event.srcElement.innerText);

    filtered_items_ul = makeRecipeThumbnails(filteredItems, displayRecipe);

    FILTER_BY_H2.innerText = event.srcElement.innerText;
    FILTER_MAIN.replaceChild(filtered_items_ul, flex_ul);
    
    FILTER_MAIN.appendChild(BACK_BUTTON);

}

async function displayRecipe(event) {
    let id = event.srcElement.id;

    let recipe = new Recipe(await fetchRecipeThroughID(id));

    FILTER_MAIN.replaceChildren(recipe.getRecipeHTML());
    FILTER_MAIN.appendChild(recipe.getMetaHTML());
    FILTER_MAIN.appendChild(createGoBackFromRecipeButton(recipe, filterType, goBackFromRecipe));

}

function goBack() {
    FILTER_BY_H2.innerText = "Filter by " + filterType;
    FILTER_MAIN.replaceChild(flex_ul, filtered_items_ul);
    filtered_items_ul.textContent = '';
    FILTER_MAIN.removeChild(BACK_BUTTON);
}

function goBackFromRecipe(event) {
    FILTER_BY_H2.innerText = event.srcElement.id;
    FILTER_MAIN.replaceChildren(FILTER_BY_H2);

    FILTER_MAIN.appendChild(filtered_items_ul);
    FILTER_MAIN.appendChild(BACK_BUTTON);
}

