import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesPrvider({ children }) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  const value = useMemo(() => ({
    data, setData, newData, setNewData,
  }), [data, setData, newData, setNewData]);
  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesPrvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default RecipesPrvider;
