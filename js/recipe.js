export class Recipe {
    
    constructor(json) {
        this.idMeal = json.idMeal;
        this.strMeal = json.strMeal;
        this.strCategory = json.strCategory;
        this.strArea = json.strArea;
        this.strInstructions = json.strInstructions;
        this.strMealThumb = json.strMealThumb;
        this.strYoutube = json.strYoutube;
        this.strSource = json.strSource;

        this.ingredients = new Map([
            [json.strIngredient1, json.strMeasure1],
            [json.strIngredient2, json.strMeasure2],
            [json.strIngredient3, json.strMeasure3],
            [json.strIngredient4, json.strMeasure4],
            [json.strIngredient5, json.strMeasure5],
            [json.strIngredient6, json.strMeasure6],
            [json.strIngredient7, json.strMeasure7],
            [json.strIngredient8, json.strMeasure8],
            [json.strIngredient9, json.strMeasure9],
            [json.strIngredient10, json.strMeasure10],
            [json.strIngredient11, json.strMeasure11],
            [json.strIngredient12, json.strMeasure12],
            [json.strIngredient13, json.strMeasure13],
            [json.strIngredient14, json.strMeasure14],
            [json.strIngredient15, json.strMeasure15],
            [json.strIngredient16, json.strMeasure16],
            [json.strIngredient17, json.strMeasure17],
            [json.strIngredient18, json.strMeasure18],
            [json.strIngredient19, json.strMeasure19],
            [json.strIngredient20, json.strMeasure20]
        ]);

    }

        getRecipeHTML() {
            const RECIPE_WRAPPER = document.createElement('article');
            RECIPE_WRAPPER.id = 'recipe_article';

            const RECIPE_H2 = document.createElement('h2');
            RECIPE_H2.id = 'recipe_name';
            RECIPE_H2.innerHTML = `<span class="keyword">class </span>` +
                this.strMeal +
                `<span class="keyword"> extends </span><span class="variable">Recipe</span>`;

            //RECIPE_WRAPPER.innerHTML += RECIPE_H2.outerHTML;
            RECIPE_WRAPPER.appendChild(RECIPE_H2);

            const RECIPE_PARAGRAPH = document.createElement('p');
            RECIPE_PARAGRAPH.id = 'recipe_paragraph';

            RECIPE_PARAGRAPH.innerHTML += `{<br>`;

            const INDENT1 = document.createElement('div');
            INDENT1.className = 'indent';
            
            this.ingredients.forEach((value, key) => {
                if(value != "" && value != null && value != " ") {

                    key = key.slice(0,1).toLowerCase() + key.slice(1, key.length);
                    key = key.replaceAll(' ', '');
                    INDENT1.innerHTML += `<span class="keyword">measure </span>` +
                        `<span class="variable">` + key + ` </span>` +
                        `<span class="function_color">= </span>` +
                        `<span class="value">'` + value + `'</span>;<br>`;        
                }
                
            });

            INDENT1.innerHTML += `<br><span class="keyword">function </span><span class="function_color">getAlgorithm()</span><br>{<br>`;
            
            const INDENT2 = document.createElement('div');
            INDENT2.className = 'indent';
            
            this.formatInstructions();

            INDENT2.innerHTML = `<span class="keyword">return</span> <span class="value">"` + this.strInstructions + `"</span>;<br>`;

            INDENT1.innerHTML += INDENT2.outerHTML + `}`;

            RECIPE_PARAGRAPH.appendChild(INDENT1);


            RECIPE_PARAGRAPH.innerHTML += `<br>}`;

            RECIPE_WRAPPER.appendChild(RECIPE_PARAGRAPH);

            return RECIPE_WRAPPER.innerHTML;

        }

        formatInstructions() {
            this.strInstructions = this.strInstructions.replaceAll('\n', '<br><br>');
        }

        isEmpty(string) {
            return !(string != "" && string != null && string != " ");
        }

        getMetaHTML() {
            const META_INFO_TABLE = document.createElement('table');
            META_INFO_TABLE.innerHTML += `<caption>META INFO</caption>`
            const TABLE_HEADERS_ROW = document.createElement('tr');
            TABLE_HEADERS_ROW.innerHTML += `<td></td>`;
            TABLE_HEADERS_ROW.innerHTML += `<th id="Recipe Category">Recipe Category</th>`;
            TABLE_HEADERS_ROW.innerHTML += `<th id="Cuisine">Cuisine</th>`;
            TABLE_HEADERS_ROW.innerHTML += `<th id="Recipe source">Recipe source</th>`;
            
            META_INFO_TABLE.appendChild(TABLE_HEADERS_ROW);

            const TABLE_DATA_ROW = document.createElement('tr');
            TABLE_DATA_ROW.innerHTML += `<th id="` + this.strMeal + `">` + this.strMeal + `</th>`;
            TABLE_DATA_ROW.innerHTML += `<td headers="` + this.strMeal + ` Recipe Category">` + this.strCategory + `</td>`;
            TABLE_DATA_ROW.innerHTML += `<td headers="` + this.strMeal + ` Cuisine">` + this.strArea + `</td>`;
           if(this.isEmpty(this.strSource)) {
                this.strSource = 'No source available';
            }
            else {
                this.strSource = `<a href=` + this.strSource + `>` + this.strSource + `</a>`
            }
            TABLE_DATA_ROW.innerHTML += `<td headers="` + this.strMeal + ` Recipe Source">` + this.strSource + `</a></td>`;
            

            META_INFO_TABLE.appendChild(TABLE_DATA_ROW);

            return META_INFO_TABLE;
        }
        
    }
