export async function RequestIngredientApi(value) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
    if (!response.ok) {
      const newError = await data.json();
      throw newError.message;
    }
    const { drinks } = await response.json();
    return drinks;
  } catch (e) {
    console.log(e);
  }
}

export async function RequestNameApi(value) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    if (!response.ok) {
      const newError = await data.json();
      throw newError.message;
    }
    const { drinks } = await response.json();
    return drinks;
  } catch (e) {
    console.log(e);
  }
}

export async function RequestFirstLetterApi(value) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
    if (!response.ok) {
      const newError = await data.json();
      throw newError.message;
    }
    const { drinks } = await response.json();
    return drinks;
  } catch (e) {
    console.log(e);
  }
}
