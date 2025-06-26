// File handles API calls

// Load all recipes
export const fetchRecipes = async () => {
    const response = await fetch(`https://dummyjson.com/recipes?limit=0`);
    const data = await response.json();
    
    return data.recipes; 
}

// Load Single Recipe
export const fetchRecipe = async (recipeID) => {
    const response = await fetch(`https://dummyjson.com/recipes/${recipeID}`);
    const data = await response.json();

    return data;
}

// Delete Recipe
export const deleteRecipe = async (recipeID) => {
    const response = await fetch(`https://dummyjson.com/recipes/${recipeID}`, {
        method: 'DELETE'
    });
    const data = await response.json();

    return data;
}