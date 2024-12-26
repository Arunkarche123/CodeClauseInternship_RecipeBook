document.addEventListener('DOMContentLoaded', () => {
  const recipeForm = document.getElementById('recipe-form');
  const recipesContainer = document.getElementById('recipes');
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  function renderRecipes() {
    recipesContainer.innerHTML = '';
    recipes.forEach((recipe, index) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <button onclick="deleteRecipe(${index})">Delete</button>
      `;
      recipesContainer.appendChild(recipeCard);
    });
  }

  recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function () {
      const recipe = {
        name,
        description,
        ingredients,
        image: reader.result,
      };
      recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      renderRecipes();
      recipeForm.reset();
    };
    if (image) reader.readAsDataURL(image);
  });

  window.deleteRecipe = function (index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderRecipes();
  };

  renderRecipes();
});
