import { React, useEffect, useRef, useState, useContext } from "react";
import StarWarsContext from "../../context/swContext";
import styles from "./StarshipsPage.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { BASE_URL } from "../../utils/constants/apiUrl";

const { container, table, table_cell } = styles;

const StarshipsPage = () => {
  const [starships, setStarships] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [scroll, setScroll] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const tableEl = useRef();
  const { serviceFavorite } = useContext(StarWarsContext);
  const { addFavorite } = serviceFavorite;

  const fetchStarships = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "starships/?page=" + numberPage);
      if (!response.ok) throw new Error("Error occured!");
      const data = await response.json();
      setStarships(starships.concat(data.results));
    } catch (error) {
      //Service error
    }
    setIsLoading(false);
  };

  const handleScrollChange = () => {
    if (numberPage === 4) return;
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
    fetchStarships();
  }, [numberPage]);

  return (
    <div className={container}>
      <table className={table} ref={tableEl}>
        <tbody>
          {starships.map((ship, index) => (
            <tr key={index}>
              <td className={table_cell}>{++index}</td>
              <td className={table_cell}>{ship.name}</td>
              <td className={table_cell}>{ship.model}</td>
              <td className={table_cell}>{ship.manufacturer}</td>
              <td className={table_cell}>{ship.cost_in_credits}</td>
              <td className={table_cell}>{ship.length}</td>
              <td className={table_cell}>{ship.max_atmosphering_speed}</td>
              <td className={table_cell}>{ship.crew}</td>
              <td className={table_cell}>{ship.passengers}</td>
              <td className={table_cell}>{ship.starship_class}</td>
              <td className={table_cell}>
                <button
                  onClick={() => addFavorite(ship, "starships")}
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

export default StarshipsPage;
