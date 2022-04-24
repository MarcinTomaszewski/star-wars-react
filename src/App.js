import { useCallback, useState } from "react";
import RouterProvider from "./components/routing/RouterProvider/RouterProvider";
import StarWarsContext from "./context/swContext";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import styles from "./App.module.css";

import { BASE_URL } from "./utils/constants/apiUrl";

const { app__wrapper, page__wrapper } = styles;

function App() {
  const [favorite, setFavorite] = useState([]);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilms = useCallback(async (type, setType, setLoading) => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL + type + "/?page=1");
      if (!response.ok) throw new Error("Error occured!");
      const data = await response.json();
      setType(data.results);
    } catch (error) {
      //service Error
    }
    setLoading(false);
  }, []);

  const serviceFavorite = {
    addFavorite: (value, type) => {
      setFavorite([...favorite, { ...value, type, id: Math.random() }]);
    },
    deleteFavorite: (id) => {
      setFavorite(favorite.filter((item) => item.id !== id));
    },
    filteredFavoriteByType: (type) => {
      return favorite.filter((item) => item.type.includes(type));
    },
  };

  return (
    <StarWarsContext.Provider
      value={{
        favorite,
        films,
        setFilms,
        isLoading,
        setIsLoading,
        fetchFilms,
        serviceFavorite,
      }}
    >
      <div className={app__wrapper}>
        <Header />
        <div className={page__wrapper}>
          <RouterProvider />
        </div>
        <Footer />
      </div>
    </StarWarsContext.Provider>
  );
}

export default App;
