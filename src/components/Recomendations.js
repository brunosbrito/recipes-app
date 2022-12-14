import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../CSS/RecipeDetails.css';

function Recomendations() {
  const history = useHistory();
  const { id } = useParams();
  const { recomendations } = useContext(RecipesContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  function sixRecomendations() {
    const SIX = 6;
    const newArray = recomendations.slice(0, SIX);
    return newArray;
  }

  const LENGTH = sixRecomendations().length;

  const carouselInfinite = () => {
    if (currentIndex === LENGTH - 2) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 2);
  };

  const changeVisibility = (index) => {
    let result;
    if (currentIndex === index || currentIndex + 1 === index) {
      result = 'visible';
    } else {
      result = 'hidden';
    }
    return result;
  };

  return (
    <div>
      {
        !recomendations.length > 0
          ? (
            <div className="load-row">
              <span />
              <span />
              <span />
              <span />
            </div>)
          : (
            <>
              <h3
                className="Container-fluid"
                style={ { marginTop: '15px' } }
              >
                recommendations

              </h3>
              {/* {console.log(sixRecomendations())} */}
              <button type="button" onClick={ carouselInfinite }>Próxima</button>
              <div className="slider-container">
                {
                  sixRecomendations().map((recipe, index) => (
                    <div
                      className="slider-item"
                      key={ index }
                      data-testid={ `${index}-recommendation-card` }
                      style={ { transform: `translate(-${currentIndex * 100}%)`,
                        visibility: changeVisibility(index) } }
                    >
                      <div>
                        <p data-testid={ `${index}-recommendation-title` }>
                          {(history.location.pathname === `/meals/${id}`)
                            ? recipe.strDrink : recipe.strMeal}
                        </p>
                        <img
                          style={ {
                            width: '100px',
                            heigth: '100px',
                          } }
                          src={ (history.location.pathname === `/meals/${id}`)
                            ? recipe.strDrinkThumb : recipe.strMealThumb }
                          alt={ (history.location.pathname === `/meals/${id}`)
                            ? recipe.strDrink : recipe.strMeal }
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
          )
      }
    </div>
  );
}

export default Recomendations;
