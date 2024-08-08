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

    if(search_results_ul != null) {
        search_results_ul.textContent = '';
    }

    search_results_ul = makeRecipeThumbnails(results, displayRecipe);

  

    if(search_results_ul == null) {

        search_results_ul = document.createElement('ul');
        search_results_ul.innerHTML = '<li>No recipies with ' + SEARCH_BAR.value + ' found :(</li>'
      /*  const no_result_text = document.createElement('p');

        no_result_text.innerText = 'No recipies found :(';
        SEARCH_MAIN.appendChild(no_result_text); */
    }

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

    