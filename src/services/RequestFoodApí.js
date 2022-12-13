export async function RequestFooterIngredientApi(value) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    if (!response.ok) {
      const newError = await data.json();
      throw newError.message;
    }
    const { meals } = await response.json();
    return meals;
  } catch (e) {
    console.log(e);
  }
}

export async function RequestFooterNameApi(value) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    if (!response.ok) {
      const newError = await data.json();
      throw newError.message;
    }
    const { meals } = await response.json();
    return meals;
  } catch (e) {
    console.log(e);
  }
}

export async function RequestFooterFisrtLetterApi(value) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    if (!response.ok) {
      const newError = await data.json();
      throw newError.message;
    }
    const { meals } = await response.json();
    return meals;
  } catch (e) {
    console.log(e);
  }
}
