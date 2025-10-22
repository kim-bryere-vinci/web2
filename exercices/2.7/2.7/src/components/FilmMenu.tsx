import type {Film} from "./types";

interface FilmMenuProps{
    films: Film[];
}

const FilmMenu = ({films}: FilmMenuProps) => {
    return (
        <table className="films-menu">
            <thead>
                <tr>
                    <th>Film</th>
                    <th>Director</th>
                    <th>Durée</th>
                    <th>ImageUrl</th>
                    <th>Description</th>
                    <th>Budget</th>
                </tr>
            </thead>
            <tbody>
                {films.map((film) => (
                    <tr key={film.titre}>
                        <td>{film.titre}</td>
                        <td>{film.director}</td>
                        <td>{film.duree}</td>
                        <td>{film.imageUrl}</td>
                        <td>{film.description}</td>
                        <td>{film.budget}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    )
}

export default FilmMenu;