export async function RequestInitialMeals() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const request = await response.json();
    console.log('req', request.meals);
    return request.meals;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RequestInitialDrinks() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const request = await response.json();
    return request.drinks;
  } catch (e) {
    throw new Error(e.message);
  }
}
