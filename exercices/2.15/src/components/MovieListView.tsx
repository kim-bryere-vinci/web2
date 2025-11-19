import type { Movie } from "./types";
import MovieCard from "./MovieCard";
import "./MovieListView.css";

interface MovieListViewProps{
    movie: Movie[];
}

const MovieListView = ({movie}: MovieListViewProps) => {
    return(
        <div>
            <ul className="movie-list-view">
                {movie.map((movie) => (
                    <MovieCard key={movie.title} movie={movie}/>
                ))}
            </ul>
        </div>
    )
}

export default MovieListView;