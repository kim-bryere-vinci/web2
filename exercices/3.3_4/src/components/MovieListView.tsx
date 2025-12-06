import type { Movie } from "./types";
import MovieCard from "./MovieCard";
import "./MovieListView.css";

interface MovieListViewProps{
    movie: Movie[];
    onMovieDeleted?: (movie: Movie) => void;
    handleEditMovieRequest?: (movie: Movie) => void;
}

const MovieListView = ({movie, onMovieDeleted, handleEditMovieRequest}: MovieListViewProps) => {
    return(
        <div>
            <ul className="movie-list-view">
                {movie.map((movie) => (
                    <MovieCard key={movie.title} movie={movie} onMovieDeleted={onMovieDeleted} handleEditMovieRequest={handleEditMovieRequest}/>
                ))}
            </ul>
        </div>
    )
}

export default MovieListView;