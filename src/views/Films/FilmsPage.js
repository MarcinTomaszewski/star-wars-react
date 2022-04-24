import { React, useEffect, useContext } from "react";
import StarWarsContext from "../../context/swContext";
import styles from "./FilmsPage.module.css";
import Spinner from "../../components/Spinner/Spinner";

const { container, table, table_cell } = styles;

const FilmsPage = () => {
  const {
    serviceFavorite,
    fetchFilms,
    isLoading,
    films,
    setFilms,
    setIsLoading,
  } = useContext(StarWarsContext);
  const { addFavorite } = serviceFavorite;

  useEffect(() => {
    fetchFilms("films", setFilms, setIsLoading);
  }, [fetchFilms, setFilms, setIsLoading]);

  return (
    <div className={container}>
      <table className={table}>
        <tbody>
          {films.map((film, index) => (
            <tr key={index}>
              <td className={table_cell}>{++index}</td>
              <td className={table_cell}>{film.title}</td>
              <td className={table_cell}>{film.episode_id}</td>
              <td className={table_cell}>{film.release_date}</td>
              <td className={table_cell}>{film.director}</td>
              <td className={table_cell}>{film.producer}</td>
              <td className={table_cell}>
                <button
                  onClick={() => addFavorite(film, "films")}
                  title="Add Favorite"
                >
                  Add Favorite
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading ? <Spinner /> : null}
    </div>
  );
};

export default FilmsPage;
