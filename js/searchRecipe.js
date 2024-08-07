import { makeRecipeThumbnails, createRecipeArticle, createMetaFieldset, createGoBackFromRecipeButton, createGoBackToSearchButton } from "./html_formatter.js";
import { searchRecipies, fetchRecipeThroughID } from "./recipeFetcher.js";
import { Recipe } from "./recipe.js";

const SEARCH_DIV = document.getElementById('searchDiv');
const SEARCH_BUTTON = document.getElementById('searchButton');
const SEARCH_BAR = document.getElementById('searchBar');
const SEARCH_MAIN = document.getElementById('search_main');

let search_results_ul;

addEventListeners();
console.log('event listeners added');

function addEventListeners() {
    SEARCH_BUTTON.addEventListener('click', search);
    SEARCH_BAR.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          search(e);
        }
    });
}

async function search() {
    let results = await searchRecipies(SEARCH_BAR.value);

    search_results_ul = makeRecipeThumbnails(results, displayRecipe);

    SEARCH_MAIN.appendChild(search_results_ul);



}

async function displayRecipe(event) {
    let id = event.srcElement.id;

    console.log(id);

    let recipe = new Recipe(await fetchRecipeThroughID(id));

    SEARCH_MAIN.replaceChildren(createRecipeArticle(recipe));
    SEARCH_MAIN.appendChild(createMetaFieldset(recipe));
    SEARCH_MAIN.appendChild(createGoBackToSearchButton(goBackToSearch));
}

function goBackToSearch() {
    SEARCH_MAIN.replaceChildren(SEARCH_DIV);
    SEARCH_MAIN.appendChild(search_results_ul);
}

    