import { useMatch, useOutletContext } from "react-router-dom";
import type { MovieContext } from "../types";
import MovieCard from "../MovieCard";

const MoviePage = () => {
    const {movies}: MovieContext = useOutletContext();

    const match = useMatch("/movies/:id");
    const movieId = Number(match?.params.id);
    if(isNaN(movieId)) return <p>Movie Not Found</p>
    
    const movieFound = movies.find((movie) => movie.id == movieId);
    if(!movieFound) return <p>Movie Not Found</p>
    return (
        <MovieCard movie={movieFound} />
    )
}

export default MoviePage;