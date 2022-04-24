import { React, useEffect, useRef, useState, useContext } from "react";
import StarWarsContext from "../../context/swContext";
import styles from "./PlanetsPage.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { BASE_URL } from "../../utils/constants/apiUrl";

const { container, table, table_cell } = styles;

const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [scroll, setScroll] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const tableEl = useRef();
  const { serviceFavorite } = useContext(StarWarsContext);
  const { addFavorite } = serviceFavorite;

  const fetchPlanets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "planets/?page=" + numberPage);
      if (!response.ok) throw new Error("Error occured!");
      const data = await response.json();
      setPlanets(planets.concat(data.results));
    } catch (error) {
      //service Error
    }
    setIsLoading(false);
  };

  const handleScrollChange = () => {
    if (numberPage === 6) return;
    if (window.scrollY > scroll) {
      setNumberPage(numberPage + 1);
      setScroll(tableEl.current.clientHeight - window.innerHeight / 20);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      window.addEventListener("scroll", handleScrollChange);
    }

    return () => window.removeEventListener("scroll", handleScrollChange);
  });

  useEffect(() => {
    fetchPlanets();
  }, [numberPage]);

  return (
    <div className={container}>
      <table className={table} ref={tableEl}>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={index}>
              <td className={table_cell}>{++index}</td>
              <td className={table_cell}>{planet.name}</td>
              <td className={table_cell}>{planet.terrain}</td>
              <td className={table_cell}>{planet.population}</td>
              <td className={table_cell}>{planet.climate}</td>
              <td className={table_cell}>{planet.gravity}</td>
              <td className={table_cell}>
                <button
                  onClick={() => addFavorite(planet, "planet")}
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

export default PlanetsPage;
