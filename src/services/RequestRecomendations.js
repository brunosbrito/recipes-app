export async function RequestRecomendationsForMeal(id) {
  try {
    // 52977
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
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
export async function RequestRecomendationsForDrink(id) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
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
