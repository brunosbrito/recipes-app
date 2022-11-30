export async function RequestIngredientApi(value) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
    const request = await response.json();
    return request.drinks;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RequestNameApi(value) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    const request = await response.json();
    return request.drinks;
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function RquestFirstLetterApi(value) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
    const request = await response.json();
    return request.drinks;
  } catch (e) {
    throw new Error(e.message);
  }
}
