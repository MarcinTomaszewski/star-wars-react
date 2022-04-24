import HomePage from "../../../views/Home/HomePage";
import PeoplePage from "../../../views/People/PeoplePage";
import FilmsPage from "../../../views/Films/FilmsPage";
import PlanetsPage from "../../../views/Planets/PlanetsPage";
import ErrorPage from "../../../views/Error/ErrorPage";
import SpaciesPage from "../../../views/Species/SpeciesPage";
import StarshipsPage from "../../../views/Starships/StarshipsPage";
import VehiclesPage from "../../../views/Vehicles/VehiclesPage";
import FavoritePage from "../../../views/Favorite/FavoritePage";

const routes = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/favorite",
    component: <FavoritePage />,
  },
  {
    path: "/people",
    component: <PeoplePage />,
  },
  {
    path: "/films",
    component: <FilmsPage />,
  },
  {
    path: "/planets",
    component: <PlanetsPage />,
  },
  {
    path: "/species",
    component: <SpaciesPage />,
  },
  {
    path: "/starships",
    component: <StarshipsPage />,
  },
  {
    path: "/vehicles",
    component: <VehiclesPage />,
  },
  {
    path: "/error",
    component: <ErrorPage />,
  },
];

export default routes;
