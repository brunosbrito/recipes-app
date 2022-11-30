export async function RequestFooterIngredientApi(value) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    const { meals } = await response.json();
    return meals;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RequestFooterNameApi(value) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const request = await response.json();
    return request.meals;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RequestFooterFisrtLetterApi(value) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    const { meals } = await response.json();
    return meals;
  } catch (e) {
    throw new Error(e.message);
  }
}
