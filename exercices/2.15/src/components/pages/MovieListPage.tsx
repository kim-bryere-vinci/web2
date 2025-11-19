
import { useOutletContext } from "react-router-dom";
import MovieListView from "../MovieListView";
import PageTitle from "../PageTitle";
import type { MovieContext } from "../types";


const MovieListPage = () => {
   const {movies} : MovieContext = useOutletContext();

    return(
        <div>
            <PageTitle title="My favourite movies : "/>
            <MovieListView movie={movies}/>
            <br />
            <br />
            <br />
        </div>
    )
} 
export default MovieListPage;