import MovieTitleList from "../MovieTitleList";
import PageTitle from "../PageTitle";
import type { MovieContext } from "../types";
import { useOutletContext } from "react-router-dom";

const HomePage = () => {
    const {movies} : MovieContext = useOutletContext();
    return (
        <div>
            <PageTitle title="My movies"/>
            <p>Welcome to My movies, a site where you can find info about cinemas, movies...</p>
            <h4>My favourites movies </h4>
            <MovieTitleList movies={movies} />
        </div>
    );
};

export default HomePage;