export async function fetchRandomRecipe() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json.meals[0];
        });
}

export async function fetchCategoryList(category) {
    return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category)
        .then((response) => {
            return response.json();
        });
}

export async function fetchRecipeThroughID(id) {
    return fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json.meals[0];
        })
}