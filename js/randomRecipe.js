import { fetchRandomRecipe, fetchCategoryList, fetchRecipeThroughID } from "./recipeFetcher.js";
import { Recipe } from "./recipe.js";

const RANDOM_MAIN = document.getElementById('random_main');


async function getRandomRecipe() {
    let jsonRecipe = await fetchRandomRecipe();
    const rndRecipe = new Recipe(jsonRecipe);

    RANDOM_MAIN.replaceChildren(rndRecipe.getRecipeHTML());
    RANDOM_MAIN.appendChild(rndRecipe.getMetaHTML());

    addButtons();

    
}

async function getRandomVegetarianRecipe() {
    let list;
    if(Math.floor(Math.random() * 10) >= 5) {
        list = await fetchCategoryList('Vegetarian');
    }
    else {
        list = await fetchCategoryList('Vegan');
    }

    let rnd = Math.floor(Math.random() * list.meals.length);
    let rndID = list.meals[rnd];
    let jsonRecipe = await fetchRecipeThroughID(rndID.idMeal);
    const recipe = new Recipe(jsonRecipe);

    RANDOM_MAIN.replaceChildren(recipe.getRecipeHTML());
    RANDOM_MAIN.appendChild(recipe.getMetaHTML());
    addButtons();
}

async function getRandomVeganRecipe() {
    let  list = await fetchCategoryList('Vegan');

    let rnd = Math.floor(Math.random() * list.meals.length);
    let rndID = list.meals[rnd];
    let jsonRecipe = await fetchRecipeThroughID(rndID.idMeal);
    const recipe = new Recipe(jsonRecipe);

    RANDOM_MAIN.replaceChildren(recipe.getRecipeHTML());
    RANDOM_MAIN.appendChild(recipe.getMetaHTML());
    addButtons();
}

function addButtons() {
    const newRandom = document.createElement('button');
    newRandom.innerText = 'getRandomRecipe();';
    newRandom.id = 'newRandom';
    newRandom.addEventListener('click', getRandomRecipe);

    const newVegetarian = document.createElement('button');
    newVegetarian.innerText = 'getRandomVegetarianRecipe();';
    newVegetarian.id = 'newVegetarian';
    newVegetarian.addEventListener('click', getRandomVegetarianRecipe);

    const newVegan = document.createElement('button');
    newVegan.innerText = 'getRandomVeganRecipe();';
    newVegan.id = 'newVegan';
    newVegan.addEventListener('click', getRandomVeganRecipe);

    RANDOM_MAIN.appendChild(newRandom);
    RANDOM_MAIN.appendChild(newVegetarian);
    RANDOM_MAIN.appendChild(newVegan);

    
}

getRandomRecipe();