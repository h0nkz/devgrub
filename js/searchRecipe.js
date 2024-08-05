import { searchRecipies } from "./recipeFetcher.js";

const SEARCH_BUTTON = document.getElementById('searchButton');
const SEARCH_BAR = document.getElementById('searchBar');

addEventListeners();
console.log('event listeners added');

function addEventListeners() {
    SEARCH_BUTTON.addEventListener('click', search);
}

async function search() {
    console.dir(await searchRecipies(SEARCH_BAR.value));
}

