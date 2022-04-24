import styles from "./Table.module.css";

const { table, table_cell } = styles;

const Table = ({ peoples, tableRef, addFavorite }) => {
  return (
    <table className={table} ref={tableRef}>
      <tbody>
        {peoples.map((people, index) => (
          <tr key={index}>
            <td className={table_cell}>{++index}</td>
            <td className={table_cell}>{people.name}</td>
            <td className={table_cell}>{people.height}</td>
            <td className={table_cell}>{people.mass}</td>
            <td className={table_cell}>{people.hair_color}</td>
            <td className={table_cell}>{people.birth_year}</td>
            <td className={table_cell}>
              <button
                onClick={() => addFavorite(people, "people")}
                title="Add Favorite"
              >
                Add Favorite
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
