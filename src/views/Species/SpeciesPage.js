import { React, useEffect, useRef, useState, useContext } from "react";
import StarWarsContext from "../../context/swContext";
import styles from "./SpeciesPage.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { BASE_URL } from "../../utils/constants/apiUrl";

const { container, table, table_cell } = styles;

const SpeciesPage = () => {
  const [species, setSpecies] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [scroll, setScroll] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const tableEl = useRef();
  const { serviceFavorite } = useContext(StarWarsContext);
  const { addFavorite } = serviceFavorite;

  const fetchSpecies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "species/?page=" + numberPage);
      if (!response.ok) throw new Error("Error occured!");
      const data = await response.json();
      setSpecies(species.concat(data.results));
    } catch (error) {
      //service Error
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
    fetchSpecies();
  }, [numberPage]);

  return (
    <div className={container}>
      <table className={table} ref={tableEl}>
        <tbody>
          {species.map((grade, index) => (
            <tr key={index}>
              <td className={table_cell}>{++index}</td>
              <td className={table_cell}>{grade.name}</td>
              <td className={table_cell}>{grade.classification}</td>
              <td className={table_cell}>{grade.designation}</td>
              <td className={table_cell}>{grade.average_height}</td>
              <td className={table_cell}>{grade.skin_colors}</td>
              <td className={table_cell}>{grade.hair_colors}</td>
              <td className={table_cell}>{grade.eye_colors}</td>
              <td className={table_cell}>{grade.average_lifespan}</td>
              <td className={table_cell}>{grade.language}</td>
              <td className={table_cell}>
                <button
                  onClick={() => addFavorite(grade, "species")}
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

export default SpeciesPage;
