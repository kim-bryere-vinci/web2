import { useOutletContext } from "react-router-dom"
import type { MovieContext } from "../types"
import AddMovieForm from "../AddMovieForm";

const AddMoviePage = () => {
    const {onMovieAdded}: MovieContext = useOutletContext();

    return (
        <div>
            <AddMovieForm onMovieAdded={onMovieAdded} />
            <br />
            <br />
            <br />
        </div>
    )
}

export default AddMoviePage;