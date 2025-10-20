import type { Movie } from "../Movie";
import HandleDescription from "../MovieItem/MovieItem";


interface CinemaProps {
    name: string;
    movies: Movie[];
  }

 
const Cinema = (props: CinemaProps) => {
    return (
      <div>
        <h2>{props.name}</h2>
        <ul>
            {props.movies.map((movie) => (
        <li key={movie.title}>
            <HandleDescription movie={movie}/>
          </li>
            ))}
        </ul>
      </div>
    );
  };

  export default Cinema;