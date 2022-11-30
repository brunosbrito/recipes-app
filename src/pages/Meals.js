// import { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesCard from '../components/RecipesCard';

function Meals() {
  // const { data } = useContext;
  // const history = useHistory;
  // const idReceita = history.push(`meals/:${data.idMeal}`);
  return (
    <>
      <Header />
      {/* { data?.length > 1 ? RecipesCard : 'teste' } */}
      <RecipesCard />

      <Footer />
    </>

  );
}

export default Meals;
