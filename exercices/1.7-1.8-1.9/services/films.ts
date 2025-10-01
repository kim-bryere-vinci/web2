import path from "node:path";
import { Film, NewFilms } from "../types";
import {parse, serialize} from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms : Film[] = [
    {
        id: 1, 
        title: "Harry potter", 
        director: "Kim BRYERE", 
        duration: 120
    },
    {
        id: 2, 
        title: "Friends", 
        director: "Lauren warren", 
        duration: 190
    },
    {
        id: 3, 
        title: "It", 
        director: "J.K Rowling", 
        duration: 100
    },
    {
        id: 4, 
        title: "It", 
        director: "John lorence", 
        duration: 210
    }, {
        id: 5, 
        title: "Harry potter 2", 
        director: "Kim BRYERE", 
        duration: 120
    }
];

function readAllFilms(filtre: string | undefined): Film[]{
    const durat = filtre && filtre.includes("minimum-duration") ? filtre: undefined;
    const sortTitle = filtre && filtre.includes("sortTitle") ? filtre: undefined;
    const sortDuration = filtre && filtre.includes("sortDuration") ? filtre: undefined;
    const films = parse(jsonDbPath, defaultFilms);
    let filteredFilms: Film [] = [];


    if(durat){
         const duration = Number(durat);
        filteredFilms = [...films].filter((film) => film.duration >= duration);
    }
    if(sortTitle){
        filteredFilms = [...films].sort((a, b) => a.title.localeCompare(b.title));
    }
    if(sortDuration){
        filteredFilms = [...films].sort((a, b) => a.duration - b.duration);
    }

    return filteredFilms.length === 0 ? films : filteredFilms;
}

function readFilmById(id: number): Film | undefined{
    const films = parse(jsonDbPath, defaultFilms);

    const film = films.find((film) => film.id === id);
    if(!film) return undefined;

    return film;
}

function createFilm(newFilm: NewFilms): Film | undefined{
    const films = parse(jsonDbPath, defaultFilms);
    if(films.find((film) => film.title === newFilm.title) && films.find((film) => film.director === newFilm.director)) return undefined;
    const lastId = films[films.length-1].id;

    const film: Film = {id: lastId +1,...newFilm};
    const updatesFilms = [...films, film];
    serialize(jsonDbPath, updatesFilms);

    return film;
}

function deleteFilm(id: number): Film | undefined{
    const films = parse(jsonDbPath, defaultFilms);
    console.log(films);
    const index = films.findIndex((film) => film.id === id);

    if(index === -1) return undefined;

    const [film] = films.splice(index, 1);
    serialize(jsonDbPath, films);
    return film;
}

function updateFilm(id: number, update: Partial<Film>): Film | undefined{
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find((film) => film.id === id);
    if(films.find((film) => film.title === update.title) && films.find((film) => film.director === update.director)) return undefined;

    if(!film) return undefined;

    if(update.budget !== undefined) film.budget = update.budget;
    if(update.description !== undefined) film.description = update.description;
    if(update.director !== undefined) film.director = update.director;
    if(update.duration !== undefined) film.duration = update.duration;
    if(update.imageUrl !== undefined) film.imageUrl = update.imageUrl;
    if(update.title !== undefined) film.title = update.title;

    serialize(jsonDbPath, film);
    return film;
}

function updateOrCreateOne(id: number, update: NewFilms): Film | undefined{
        const films = parse(jsonDbPath, defaultFilms);
      
        const index = films.findIndex((film) => film.id === id);
      
        if (index === -1) {
          return createFilm(update);
        }
      
        const film = { ...films[index], ...update };
      
        films[index] = film;
        serialize(jsonDbPath, films);
      
        return film;
}

export {
    readAllFilms, readFilmById, deleteFilm, updateFilm, createFilm, updateOrCreateOne
};