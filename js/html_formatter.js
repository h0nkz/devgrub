export function getFilter(filterList, filterType) {
    let flex_ul = document.createElement('ul');
    flex_ul.className = 'flex_ul';
    filterList.forEach((item) => {
        const LIST_ITEM = document.createElement('li');
        LIST_ITEM.className = 'filter_item';
        LIST_ITEM.innerHTML = getListItemString(item, filterType);
        flex_ul.appendChild(LIST_ITEM);
    });

    return flex_ul;
}

function getListItemString(jsonNode, filterType) {
    switch(filterType) {
        case 'cuisine':
            return jsonNode.strArea;
        case 'ingredient':
            return jsonNode.strIngredient;
        case 'recipeCategory':
            return jsonNode.strCategory;
    }
}

export function makeRecipeThumbnails(filteredItems, onclickfunc ) {
    let filtered_items_ul = document.createElement('ul');
    filtered_items_ul.className = 'filtered_items_ul';
    
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
        LIST_ITEM.addEventListener('click', onclickfunc)
        filtered_items_ul.appendChild(LIST_ITEM);
    });

    return filtered_items_ul;
}

export function createRecipeArticle(recipe) {
    const RECIPE_ARTICLE = document.createElement('article');
    RECIPE_ARTICLE.id = "recipe_article";
    RECIPE_ARTICLE.appendChild(recipe.getRecipeHTML());

    return RECIPE_ARTICLE;
}

export function createMetaFieldset(recipe) {
    const META_FIELDSET = document.createElement('fieldset');
    META_FIELDSET.id = "meta_info";
    META_FIELDSET.appendChild(recipe.getMetaHTML());

    return META_FIELDSET;
}

export function createGoBackFromRecipeButton(recipe, filtertype, onclickfunc) {
    const recipe_back_button = document.createElement('button');
    recipe_back_button.id = getListItemString(recipe, filtertype); //ADD FILTERTYPE
    recipe_back_button.innerText = 'goBack();'
    recipe_back_button.addEventListener('click', onclickfunc);

    return recipe_back_button;
}

export function createGoBackToSearchButton(onclickfunc) {
    const recipe_back_button = document.createElement('button');
    recipe_back_button.innerText = 'goBack();'
    recipe_back_button.addEventListener('click', onclickfunc);

    return recipe_back_button;
}
