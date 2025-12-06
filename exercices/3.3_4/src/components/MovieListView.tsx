import type { Movie } from "./types";
import MovieCard from "./MovieCard";
import "./MovieListView.css";

interface MovieListViewProps{
    movie: Movie[];
    onMovieDeleted?: (movie: Movie) => void;
}

const MovieListView = ({movie, onMovieDeleted}: MovieListViewProps) => {
    return(
        <div>
            <ul className="movie-list-view">
                {movie.map((movie) => (
                    <MovieCard key={movie.title} movie={movie} onMovieDeleted={onMovieDeleted}/>
                ))}
            </ul>
        </div>
    )
}

export default MovieListView;