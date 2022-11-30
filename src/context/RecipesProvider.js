import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [initialRecipes, setInitialRecipes] = useState([]);

  const value = useMemo(() => ({
    data, setData, newData, setNewData, initialRecipes, setInitialRecipes,
  }), [data, setData, newData, setNewData, initialRecipes, setInitialRecipes]);
  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default RecipesProvider;
