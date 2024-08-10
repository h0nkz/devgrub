import { fetchRandomRecipe, fetchCategoryList, fetchRecipeThroughID } from "./recipeFetcher.js";
import { Recipe } from "./recipe.js";

const NEW_RND_BTN = document.getElementById('newRandom');
const NEW_RND_VEGE_BTN = document.getElementById('newVegetarian');
const NEW_RND_VEGAN_BTN = document.getElementById('newVegan');
let RECIPE_ARTICLE = document.getElementById('recipe_article');
const META_INFO_FIELDSET = document.getElementById('meta_info');

function addEventListeners() {
    NEW_RND_BTN.addEventListener('click', getRandomRecipe);
    NEW_RND_VEGE_BTN.addEventListener('click', getRandomVegetarianRecipe);
    NEW_RND_VEGAN_BTN.addEventListener('click', getRandomVeganRecipe);
}
async function getRandomRecipe() {
    let jsonRecipe = await fetchRandomRecipe();
    const rndRecipe = new Recipe(jsonRecipe);

    RECIPE_ARTICLE.innerHTML = rndRecipe.getRecipeHTML();
    META_INFO_FIELDSET.replaceChildren(rndRecipe.getMetaHTML());

    
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

    RECIPE_ARTICLE.replaceChildren(recipe.getRecipeHTML());
    META_INFO_FIELDSET.replaceChildren(recipe.getMetaHTML());
}

async function getRandomVeganRecipe() {
    let  list = await fetchCategoryList('Vegan');

    let rnd = Math.floor(Math.random() * list.meals.length);
    let rndID = list.meals[rnd];
    let jsonRecipe = await fetchRecipeThroughID(rndID.idMeal);
    const recipe = new Recipe(jsonRecipe);

    RECIPE_ARTICLE.replaceChildren(recipe.getRecipeHTML());
    META_INFO_FIELDSET.replaceChildren(recipe.getMetaHTML());
}

addEventListeners();
getRandomRecipe();