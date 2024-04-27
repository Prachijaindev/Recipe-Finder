const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const recipeCont = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");
const body = document.querySelector("body");
const nav = document.querySelector("header nav");

const fetchRecipe = async (query) => {
    body.classList.add("no-background");
    nav.classList.add("header-nav");
    recipeCont.innerHTML = "<h2>Fetching recipe..</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeCont.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p> <span>${meal.strArea} </span> Dish </p>
        <p>${meal.strCategory}</p>
        `
        const button = document.createElement('button');
        button.textContent = "view recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });
        recipeCont.appendChild(recipeDiv);
    });
}
//fetching  ingredients from api and showing into the popup box
const fetchIngredients = (meal) => {
    let ingredientList = ""; //because abhi ye empty hai 
    for (let i = 1; i <= 20; i++) {//loop to iterate over evry ingredient in the api
        const ingredient = meal[`strIngredient${i}`]; //to store ingredient
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`//adding measure n ingre in the ingredienlist
        } else {
            break;//if there is no ingredient present on any ith element the loop will break
        }
    }
    return ingredientList;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipe-name"> ${meal.strMeal} </h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
       <h3>Instructions:</h3>
       <p class="instruction">${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";

}
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);

});
