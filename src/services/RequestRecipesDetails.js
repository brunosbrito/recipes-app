export async function RequestMealsId(id) {
  try {
    // 52977
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await response.json();
    return meals;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function RequestDrinkId(id) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (e) {
    throw new Error(e.message);
  }
}
