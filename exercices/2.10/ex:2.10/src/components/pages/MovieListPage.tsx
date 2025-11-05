import { useState } from "react";
import AddMovieForm from "../AddMovieForm";
import MovieListView from "../MovieListView";
import PageTitle from "../PageTitle";
import type { Movie } from "../types";


const MovieListPage = () => {
    const defaultFilms: Movie[] = [
        {
          title: "Inception",
          director: "Christopher Nolan",
          duration: 148,
          imageUrl: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg",
          description: "Un voleur qui s'infiltre dans les rêves pour voler des secrets doit accomplir une mission presque impossible : implanter une idée dans l'esprit d'une cible.",
          budget: 160_000_000
        },
        {
          title: "Interstellar",
          director: "Christopher Nolan",
          duration: 169,
          imageUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg",
          description: "Un groupe d'explorateurs voyage à travers un trou de ver pour sauver l'humanité de l'extinction.",
          budget: 165_000_000
        },
        {
          title: "The Matrix",
          director: "Lana Wachowski, Lilly Wachowski",
          duration: 136,
          imageUrl: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1188_.jpg",
          description: "Un pirate informatique découvre que la réalité qu’il connaît n’est qu’une simulation et rejoint la résistance pour libérer l’humanité.",
          budget: 63_000_000
        },
        {
          title: "Parasite",
          director: "Bong Joon-ho",
          duration: 132
        },
        {
          title: "The Lord of the Rings: The Fellowship of the Ring",
          director: "Peter Jackson",
          duration: 178,
          imageUrl: "https://m.media-amazon.com/images/I/81EBpXO9eDL._AC_SL1500_.jpg",
          description: "Un jeune hobbit hérite d’un anneau maléfique et entreprend une quête périlleuse pour le détruire.",
          budget: 93_000_000
        }
    ]

    const [movies, setMovies] = useState(defaultFilms);
    const onMovieAdded = (newMovie: Movie) => {
        console.log("Movie to add : ",  newMovie);
        setMovies([...movies, newMovie]);
    }

    return(
        <div>
            <PageTitle title="My favourite movies : "/>
            <MovieListView movie={movies}/>
            <AddMovieForm onMovieAdded={onMovieAdded}/>
            <br />
            <br />
            <br />
        </div>
    )
} 
export default MovieListPage;