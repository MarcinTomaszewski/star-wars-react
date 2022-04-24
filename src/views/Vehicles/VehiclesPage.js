import { React, useEffect, useRef, useState, useContext } from "react";
import StarWarsContext from "../../context/swContext";
import styles from "./VehiclesPage.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { BASE_URL } from "../../utils/constants/apiUrl";

const { container, table, table_cell } = styles;

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [scroll, setScroll] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const tableEl = useRef();
  const { serviceFavorite } = useContext(StarWarsContext);
  const { addFavorite } = serviceFavorite;

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "vehicles/?page=" + numberPage);
      if (!response.ok) throw new Error("Error occured!");
      const data = await response.json();
      setVehicles(vehicles.concat(data.results));
    } catch (error) {
      //service error
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
    fetchVehicles();
  }, [numberPage]);

  return (
    <div className={container}>
      <table className={table} ref={tableEl}>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td className={table_cell}>{++index}</td>
              <td className={table_cell}>{vehicle.name}</td>
              <td className={table_cell}>{vehicle.model}</td>
              <td className={table_cell}>{vehicle.manufacturer}</td>
              <td className={table_cell}>{vehicle.cost_in_credits}</td>
              <td className={table_cell}>{vehicle.length}</td>
              <td className={table_cell}>{vehicle.max_atmosphering_speed}</td>
              <td className={table_cell}>{vehicle.crew}</td>
              <td className={table_cell}>{vehicle.passengers}</td>
              <td className={table_cell}>{vehicle.vehicle_class}</td>
              <td className={table_cell}>
                <button
                  onClick={() => addFavorite(vehicle, "vehicles")}
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

export default VehiclesPage;
