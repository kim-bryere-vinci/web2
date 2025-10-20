import { useState } from "react"
import type { Movie } from "../Movie"
import "./MovieItem.css"

interface MovieItemprops{
    movie: Movie
}

const HandleDescription = ({movie}: MovieItemprops) => {
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    return(
        <div>
        <ul>
        <li onClick={() => setDescriptionVisible(true)} className="clickTitle">
            <p className="title">{movie.title}</p>- Réalisateur :{" "}
            {movie.director}
            <p className="description">{descriptionVisible ? <i>{movie.description}</i> : null}</p>
          </li>
        </ul>
      </div>
    )
}

export default HandleDescription;