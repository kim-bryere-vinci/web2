import { type SyntheticEvent, useState } from "react";
import { type Movie } from "./types";

interface EditMovieProps{
    movie: Movie,
    onMovieEdited: (movie : Movie) => void;
}

const EditForm = ({movie, onMovieEdited}: EditMovieProps) => {
    const [title, setTitle] = useState(movie.title);
    const [director, setDirector] = useState(movie.director);
    const [duration, setDuration] = useState<number | undefined>(movie.duration ? movie.duration : undefined);
    const [description, setDescription] = useState<string | undefined>(movie.description);
    const [imageUrl, setImageUrl] = useState<string | undefined>(movie.imageUrl);
    const [budget, setBudget] = useState<number | undefined>(movie.budget ? movie.budget : undefined);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        onMovieEdited({
            id: movie.id,
            title,
            director,
            duration,
            imageUrl: imageUrl === "" ? undefined : imageUrl,
            description: description === "" ? undefined : description,
            budget: budget !== undefined && isNaN(budget) ? undefined : budget
        } as Movie)}

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre : </label>
                    <input type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>Director : </label>
                    <input type="text" 
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>Duration : </label>
                    <input type="text" 
                    value={duration ?? ""}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    required/>
                </div>
                <div>
                    <label>URL de l'image : </label>
                    <input type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>Description : </label>
                    <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>Budget : </label>
                    <input type="text" 
                    value={budget ?? ""}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    required/>
                </div>
                <button type="submit">Éditer</button>
            </form>
        )
    
}

export default EditForm;