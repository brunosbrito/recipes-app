import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';

export default function Footer() {
  const history = useHistory();
  function handleDrinkClick() {
    history.push('/drinks');
  }

  const handleMenuClick = () => {
    history.push('/menu');
  };

  return (
    <footer data-testid="footer">
      <button type="button" onClick={ handleDrinkClick }>
        <img src={ drinkIcon } alt=" Drink Menu" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ handleMenuClick }>
        <img src={ mealIcon } alt="Meal Menu" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}
