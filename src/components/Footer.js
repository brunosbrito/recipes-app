import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';
import RecipesContext from '../context/RecipesContext';

export default function Footer() {
  const { setData } = useContext(RecipesContext);
  const history = useHistory();

  function handleDrinkClick() {
    history.push('/drinks');
    setData([]);
  }

  const handleMealClick = () => {
    history.push('/meals');
    setData([]);
  };

  return (
    <footer data-testid="footer">
      <button type="button" onClick={ handleDrinkClick }>
        <img
          src={ drinkIcon }
          alt=" Drink Menu"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button type="button" onClick={ handleMealClick }>
        <img src={ mealIcon } alt="Meal Menu" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}
