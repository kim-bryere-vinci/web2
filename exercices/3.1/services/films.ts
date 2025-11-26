import { Film, NewFilm } from "../types";
import path from "node:path";
import { parse, serialize } from "../utils/json";

const jsonDBPath = path.join(__dirname, "/../data/films.json" );



const defaultFilms: Film[] = [
    {
        id: 1,
        title: "Shang-Chi and the Legend of the Ten Rings",
        director: "Destin Daniel Cretton",
        duration: 132,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
        description:
          "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
        budget: 150,
      },
      {
        id: 2,
        title: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        duration: 136,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
        description:
          "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        budget: 63,
      },
      {
        id: 3,
        title: "Summer Wars",
        director: "Mamoru Hosoda",
        duration: 114,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
        description:
          "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
        budget: 18.7,
      },
      {
        id: 4,
        title: "The Meyerowitz Stories",
        director: "Noah Baumbach",
        duration: 112,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
        description:
          "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
      },
      {
        id: 5,
        title: "her",
        director: "Spike Jonze",
        duration: 126,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
        description:
          "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
        budget: 23,
      },
]

const readAll = (): Film[] => {
    const films = parse(jsonDBPath, defaultFilms);
    return films;
}

const readOne = (id: number) : Film | undefined => {
    const films = parse(jsonDBPath, defaultFilms);

    const foundFilm = films.find((film) => film.id === id);

    if(!foundFilm) return undefined;

    return foundFilm;
}

const createOne = (nfilm: NewFilm): Film | undefined => {
    const films = parse(jsonDBPath, defaultFilms);
    
    const existingFilm = films.find((film) => film.title.toLocaleLowerCase() === nfilm.title.toLocaleLowerCase() && film.director.toLocaleLowerCase() === nfilm.director.toLocaleLowerCase());

    if(existingFilm) return undefined;
    
    const film = {id: nextId(), ...nfilm};

    films.push(film);
    serialize(jsonDBPath, films);
    return film;
}

const deleteOne = (id : number): boolean => {
    const films = parse(jsonDBPath, defaultFilms);

    const index = films.findIndex((film) => film.id === id);

    if(index == -1) return false;

    films.splice(index, 1);
    serialize(jsonDBPath, films);
    return true;
}

const updateOne = (id: number, updatedFilm: Partial<Film>): Film | undefined => {
    const films = parse(jsonDBPath, defaultFilms);
    
    const index = films.findIndex((film) => film.id === id);
    const existingFilm = films.find((film) => film.title == updatedFilm.title && film.director == updatedFilm.director);

    if(existingFilm) return undefined;

    if(index == -1) return undefined;

    const film = {...films[index], ...updatedFilm};

    films[index] = film;
    serialize(jsonDBPath, films);
    return film;
}

const nextId = () => 
    parse(jsonDBPath, defaultFilms).reduce((maxId, film) => Math.max(maxId, film.id), 0)+1


export { readAll, readOne, createOne, deleteOne, updateOne };