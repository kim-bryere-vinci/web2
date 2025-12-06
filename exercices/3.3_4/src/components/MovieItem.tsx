import { useState } from "react";
import type { Movie } from "./types.ts";

interface MovieItemProps{
    movie: Movie;
}

const MovieItem = ({movie} : MovieItemProps) => {
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    return (
        <div>
            <ul>
                <li onClick={() => setDescriptionVisible(true)} className="clickTitle">
                    <p className="title"><strong>{movie.title} </strong>
                    Réalisateur : {movie.director}</p>
                    <p>{descriptionVisible ? <i>{movie.description}</i> : null}</p>
                </li>
            </ul>
        </div>
    )
}

export default MovieItem;