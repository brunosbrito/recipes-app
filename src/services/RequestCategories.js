export async function RequestMealsCategories() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const request = await response.json();
    // console.log('req', request.meals);
    return request.meals;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RequestDrinksCategories() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const request = await response.json();
    return request.drinks;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RequestByMealCategory(category) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const request = await response.json();
    return request.meals;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RequestByDrinkCategory(category) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const request = await response.json();
    return request.drinks;
  } catch (e) {
    throw new Error(e.message);
  }
}
