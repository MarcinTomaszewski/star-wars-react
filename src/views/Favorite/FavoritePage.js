import React, { useContext } from "react";
import StarWarsContext from "../../context/swContext";
import styles from "./FavoritePage.module.css";

const { container, table, table_cell } = styles;

const FavoritePage = () => {
  const { favorite, serviceFavorite } = useContext(StarWarsContext);
  const { deleteFavorite } = serviceFavorite;

  return (
    <div className={container}>
      {favorite.length ? (
        <table className={table}>
          <tbody>
            {favorite.map((item, index) => (
              <tr key={index}>
                <td className={table_cell}>{++index}</td>
                <td className={table_cell}>{item.type}</td>
                <td className={table_cell}>
                  {item.type === "films" ? item.title : item.name}
                </td>
                <td className={table_cell}>
                  <button
                    onClick={() => deleteFavorite(item.id)}
                    title="Delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Section is empty!</p>
      )}
    </div>
  );
};

export default FavoritePage;
