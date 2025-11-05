import type { Movie } from "./types";
import MovieItem from "./MovieItem";

interface CinemaProps{
    name: string,
    movie: Movie[]
}

const Cinema = ({name, movie}: CinemaProps) => {
    return(
        <div>
            <h2>{name}</h2>
            <ul>
                {movie.map((movie) => (
                    <MovieItem key={movie.title} movie={movie}/>
                ))}
            </ul>
        </div>
    )
}

export default Cinema;