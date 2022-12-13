import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.png';
import { RequestDrinkId, RequestMealsId } from '../services/RequestRecipesDetails';
import RecipesContext from '../context/RecipesContext';

function FavBtn() {
  const history = useHistory();
  const { id } = useParams();
  const url = history.location.pathname;
  const [localHeart, setLocalheart] = useState(false);
  const [dataMealsArray, setDataMealsArray] = useState([]);
  const [dataDrinkArray, setDataDrinkArray] = useState([]);
  const { array } = useContext(RecipesContext);

  const requestDrink = async () => {
    const dataDrink = await RequestDrinkId(id);
    return setDataDrinkArray(dataDrink);
  };

  const requestMeals = async () => {
    const dataMeals = await RequestMealsId(id);
    return setDataMealsArray(dataMeals);
  };

  function checkPathname() {
    if (history.location.pathname === `/meals/${id}`) {
      return dataMealsArray;
    }
    return dataDrinkArray;
  }

  const saveFavorites = (recipe) => {
    const obj = {
      id: recipe.idMeal || recipe.idDrink,
      type: url.includes('meals') ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    const favoritesLocal = (JSON.parse(localStorage.getItem('favoriteRecipes')));
    const newfavoritesLocal = (favoritesLocal === null)
      ? [obj] : [...favoritesLocal, obj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoritesLocal));
    favoritesLocal.forEach((e) => {
      if (e.id !== id) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoritesLocal));
      } else {
        const filtro = favoritesLocal.filter((el) => el.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
        setLocalheart(false);
      }
    });
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (favoriteRecipes !== null) {
      const fav = favoriteRecipes.some((el) => el.id === id);
      setLocalheart(fav);
    }
  }, [id]);

  useEffect(() => {
    checkPathname();
    requestMeals();
    requestDrink();
  }, []);
  console.log(array);
  return (
    <div>
      <button
        className="btn"
        style={ { border: 'none', backgroundColor: 'white', marginRight: '15px' } }
        data-testid="favorite-btn"
        type="submit"
        src={ localHeart ? blackHeart : whiteHeart }
        onClick={ () => {
          saveFavorites(checkPathname() == null ? array[0] : checkPathname()[0]);
          setLocalheart((!localHeart));
        } }
      >
        <img src={ localHeart ? blackHeart : whiteHeart } alt="coração" />
      </button>
    </div>

  );
}
export default FavBtn;
