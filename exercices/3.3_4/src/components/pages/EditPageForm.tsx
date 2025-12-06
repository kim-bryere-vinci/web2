import { useMatch, useOutletContext } from "react-router-dom";
import { type MovieContext } from "../types";
import EditForm from "../EditForm";
import PageTitle from "../PageTitle";

const EditPageForm = () => {
    const {movies, onMovieEdited} : MovieContext = useOutletContext();
    const match = useMatch("/movies/:id/edit");
    const movieId = Number(match?.params.id);
    if(isNaN(movieId)) return <p>Movie not found</p>;

    const MovieFound = movies.find((film) => film.id === movieId);
    if(!MovieFound)  return <p>Movie not found</p>;

    return(
        <div>
            <PageTitle title="Edit a movie" />
            <EditForm onMovieEdited={onMovieEdited} movie={MovieFound} />
            <br />
            <br />
            <br />
        </div>
    )

}

export default EditPageForm;