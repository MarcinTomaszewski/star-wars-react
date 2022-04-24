import { React, useEffect, useRef, useState, useContext } from "react";
import StarWarsContext from "../../context/swContext";
import styles from "./PeoplePage.module.css";
import Table from "../../components/Table/Table";
import Spinner from "../../components/Spinner/Spinner";
import { BASE_URL } from "../../utils/constants/apiUrl";

const { container } = styles;

const PeoplePage = () => {
  const [peoples, setPeoples] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [scroll, setScroll] = useState(150);
  const [isLoading, setIsLoading] = useState(false);
  const tableEl = useRef();
  const { serviceFavorite } = useContext(StarWarsContext);
  const { addFavorite } = serviceFavorite;

  const fetchPeoples = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL + "people/?page=" + numberPage);
      if (!response.ok) throw new Error("Error occured!");
      const data = await response.json();
      setPeoples(peoples.concat(data.results));
    } catch (error) {
      //service Error
    }
    setIsLoading(false);
  };

  const handleScrollChange = () => {
    if (numberPage === 9) return;
    if (window.scrollY > scroll) {
      setNumberPage(numberPage + 1);
      setScroll(tableEl.current.clientHeight - window.innerHeight / 20);
      console.log(tableEl.current);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      window.addEventListener("scroll", handleScrollChange);
    }

    return () => window.removeEventListener("scroll", handleScrollChange);
  });

  useEffect(() => {
    fetchPeoples();
  }, [numberPage]);

  return (
    <div className={container}>
      <Table peoples={peoples} tableRef={tableEl} addFavorite={addFavorite} />

      {isLoading ? <Spinner /> : null}
    </div>
  );
};

export default PeoplePage;
