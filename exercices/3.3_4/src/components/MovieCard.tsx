import type { Movie } from "./types";
import "./MovieCard.css";

interface MovieCardProps{
    movie: Movie;
    onMovieDeleted?: (movie:Movie) => void;
}



const MovieCard = ({movie, onMovieDeleted} : MovieCardProps) => {

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{movie.title}</h3>
                {movie.imageUrl && (<img src={movie.imageUrl} className="img-card" alt={movie.title}></img>)}

                <p className="card-text">
                    <strong>Réalisateur : </strong> {movie.director}
                </p>

                <p className="card-text">
                    <strong>Durée : </strong> {movie.duration}
                </p>

                {movie.budget && (<p className="card-text">
                    <strong>Budget : </strong> {movie.budget}</p>)} 
            
                {movie.description && (<p className="card-text">
                    <strong>Description : </strong> {movie.description}
                </p>)}
                {onMovieDeleted && (
                    <button onClick={() => onMovieDeleted(movie)}>Delete</button>)}
            </div>
        </div>
    )
}

export default MovieCard;