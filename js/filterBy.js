import { fetchFilterList, fetchFilteredItems, fetchRecipeThroughID } from "./recipeFetcher.js";
import { Recipe } from "./recipe.js";

const FILTER_MAIN = document.querySelector('.filter_main');
const categoryChar = 'a';

const FILTER_BY_H2 = document.createElement('h2');
FILTER_BY_H2.id = 'filter_h2';

const flex_ul = document.createElement('ul');
flex_ul.className = 'flex_ul';

const FILTERED_ITEMS_UL = document.createElement('ul');
FILTERED_ITEMS_UL.className = 'filtered_items_ul';

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
console.dir(filterList);

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
    FILTER_MAIN.appendChild(getFilter(filterList)); 
}

async function displayFilteredItems(event) {
    
    let filteredItems = await fetchFilteredItems(getFilterChar(), event.srcElement.innerText);

    filteredItems.forEach((item) => {
        const LIST_ITEM = document.createElement('li');
        LIST_ITEM.className = 'filtered_item';
        const LIST_IMAGE = document.createElement('img');
        LIST_IMAGE.src = item.strMealThumb;
        LIST_IMAGE.alt = item.strMeal;
        
        LIST_IMAGE.className = 'food_thumbnail';

        LIST_ITEM.appendChild(LIST_IMAGE);
        LIST_ITEM.innerHTML += item.strMeal;
        LIST_ITEM.id = item.idMeal;
        LIST_ITEM.addEventListener('click', displayRecipe)
        FILTERED_ITEMS_UL.appendChild(LIST_ITEM);
    });

    FILTER_BY_H2.innerText = event.srcElement.innerText;
    FILTER_MAIN.replaceChild(FILTERED_ITEMS_UL, flex_ul);
    
    FILTER_MAIN.appendChild(BACK_BUTTON);


}

async function displayRecipe(event) {
    console.dir(event);
    let id = event.srcElement.id;

    let recipe = new Recipe(await fetchRecipeThroughID(id));

    const RECIPE_ARTICLE = document.createElement('article');
    RECIPE_ARTICLE.id = "recipe_article";
    RECIPE_ARTICLE.appendChild(recipe.getRecipeHTML());

    const META_FIELDSET = document.createElement('fieldset');
    META_FIELDSET.id = "meta_info";
    META_FIELDSET.appendChild(recipe.getMetaHTML());

    const recipe_back_button = document.createElement('button');
    recipe_back_button.id = getListItemString(recipe);
    recipe_back_button.innerText = 'goBack();'
    recipe_back_button.addEventListener('click', goBackFromRecipe);
    
    FILTER_MAIN.replaceChildren(RECIPE_ARTICLE);
    FILTER_MAIN.appendChild(META_FIELDSET);
    FILTER_MAIN.appendChild(recipe_back_button);

}

function getFilter(filterList) { 

    filterList.forEach((item) => {
        const LIST_ITEM = document.createElement('li');
        LIST_ITEM.className = 'filter_item';
        LIST_ITEM.innerHTML = getListItemString(item);
        flex_ul.appendChild(LIST_ITEM);
    });

    return flex_ul;
}

function getListItemString(jsonNode) {
    switch(filterType) {
        case 'cuisine':
            return jsonNode.strArea;
        case 'ingredient':
            return jsonNode.strIngredient;
        case 'recipeCategory':
            return jsonNode.strCategory;
    }
}

function goBack() {
    FILTER_BY_H2.innerText = "Filter by " + filterType;
    FILTER_MAIN.replaceChild(flex_ul, FILTERED_ITEMS_UL);
    FILTERED_ITEMS_UL.textContent = '';
    FILTER_MAIN.removeChild(BACK_BUTTON);
}

function goBackFromRecipe(event) {
    FILTER_BY_H2.innerText = event.srcElement.id;
    FILTER_MAIN.replaceChildren(FILTER_BY_H2);

    FILTER_MAIN.appendChild(FILTERED_ITEMS_UL);
    FILTER_MAIN.appendChild(BACK_BUTTON);
}

