import { Router } from "express";
import path from "node:path";
import { parse, serialize } from "../utils/json";
import { films, NewFilms } from "../types";
import { isNumber } from "../utils/type-guards";


const jsonDbPath = path.join(__dirname, "/../data/films.js");
const router = Router();


const defaultFilms : films[] = [
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

/**
 * READ ALL : lire toutes les ressources de la collection
 */
router.get("/", (req, res) =>{
    const films = parse(jsonDbPath, defaultFilms);
    const durat = Number(req.query['minimum-duration']);
    const sort = req.query.sort;
    const sortDuration = req.query.sortDuration;

    if(durat){
        const film = films.filter((film) => film.duration >= durat);
        return res.json(film);
    }

    if(sort){
        const films : films[] = [];
        for(let i = 0; i < defaultFilms.length; i++){
            films.push(defaultFilms[i]);
        }
        films.sort((f1, f2) => {
            if(f1.title > f2.title)
                return 1;
            
            if(f1.title < f2.title)
                return -1;
            
            return 0; });
        return res.json(films);
    }

    if(sortDuration){
        const films : films[] = [];
        for(let i = 0; i < defaultFilms.length; i++){
            films.push(defaultFilms[i]);
        }
        films.sort((f1, f2) => {
            if(f1.duration < f2.duration)
                return 1;
            if(f1.duration > f2.duration)
                return -1;
            return 0;
        });
        return res.json(films);
    }
    return res.json(defaultFilms);
});

router.get("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find((film) => film.id == id);
    if(film === undefined)return res.sendStatus(404);

    return res.json(film);
    
});

router.post("/", (req, res) =>{
    const corps : unknown = req.body;
    if(!corps || typeof corps !== "object" || !("title" in corps) || !("director" in corps)
    || !("duration" in corps) || typeof corps.director !== "string" || typeof corps.title !== "string" || !corps.title.trim()
    || !corps.director.trim() || ("budget" in corps && typeof corps.budget !== "number" || ("description" in corps && typeof corps.description !== "string")
    || ("imageUrl" in corps && typeof corps.imageUrl !== "string"))){
        return res.sendStatus(400);
    }

    const {title, director, duration, budget, description, imageUrl} = corps as NewFilms;

    const films = parse(jsonDbPath, defaultFilms);

    const nextId = defaultFilms.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

    if(Number(corps.duration) < 0){
        return res.sendStatus(400);
    }

    for(let i = 0; i < defaultFilms.length; i++){
        if(defaultFilms[i].title.toLowerCase() === title.toLowerCase() && defaultFilms[i].director.toLowerCase() === director.toLowerCase()){
            return res.sendStatus(409);
        } 
    }

    const newFilm : films = {
        id: nextId, 
        title,
        director,
        duration,
        budget,
        description,
        imageUrl

    };

    defaultFilms.push(newFilm);
    serialize(jsonDbPath, films);
    return res.json(newFilm);
    
});

router.delete("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const film = parse(jsonDbPath, defaultFilms);
    if(!isNumber(id)) return res.sendStatus(400);

    const index = defaultFilms.findIndex((film) => film.id === id);
    if(index === -1) return res.sendStatus(404);

    const deleteRest = defaultFilms.splice(index, 1);
    serialize(jsonDbPath, film);
    return res.json(deleteRest[0]);
});

router.patch("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const films = parse(jsonDbPath, defaultFilms);

    if(!isNumber(id)) return res.sendStatus(400);


    const film = defaultFilms.find((film) => film.id === id);
    if(!film) return res.sendStatus(404);

    const body: unknown = req.body;

    if(
        !body || typeof body !== "object" ||
        ("title" in body && (typeof body.title !== "string")) || 
        ("director" in body && (typeof body.director !== "string")) || 
        ("duration" in body && (typeof body.duration !== "number")) ||
        ("budget" in body && (typeof body.budget !== "number")) ||
        ("description" in body && (typeof body.description !== "string")) ||
        ("imageUrl" in body && (typeof body.imageUrl !== "string")) 
    ) return res.sendStatus(400);

    const {title, director, duration, budget, description, imageUrl} : Partial<NewFilms> = body;

    if(title){
        film.title = title;
    }
    if(director){
        film.director = director;
    }
    if(duration){
        film.duration = duration;
    }
    if(budget){
        film.budget = budget;
    }
    if(description){
        film.description = description;
    }
    if(imageUrl){
        film.imageUrl = imageUrl;
    }
    serialize(jsonDbPath, films);
    return res.json(film);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const films = parse(jsonDbPath, defaultFilms);
    if(!isNumber(id)) return res.sendStatus(400);

    const body: unknown= req.body;
    if(
        !body || typeof body !== "object" ||
        !("title" in body) || (typeof body.title !== "string" || !body.title.trim()) || 
        !("director" in body) || (typeof body.director !== "string" || !body.director.trim()) || 
        !("duration" in body) || (typeof body.duration !== "number" ) ||
        !("budget" in body) || (typeof body.budget !== "number" ) ||
        !("description" in body) || (typeof body.description !== "string" || !body.description.trim()) ||
        !("imageUrl" in body) || (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) {
        return res.sendStatus(400);
    }
    
    const film = defaultFilms.find((film) => film.id === id);


    if(!film){
         const {title, director, duration, budget, description, imageUrl} = body as NewFilms;
    
    
         if(Number(body.duration) < 0 || Number(body.budget) < 0){
            return res.sendStatus(400);
         }
    
        for(let i = 0; i < defaultFilms.length; i++){
             if(defaultFilms[i].title.toLowerCase() === title.toLowerCase() && defaultFilms[i].director.toLowerCase() === director.toLowerCase()){
                 return res.sendStatus(409);
             } 
         }

         const nextId = defaultFilms.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
    
         const newFilm : films = {
             id: nextId, 
             title,
             director,
             duration,
             budget,
             description,
             imageUrl
    
         };
    
         defaultFilms.push(newFilm);
         serialize(jsonDbPath, films);
         return res.json(newFilm);
     }

    const {title, director, duration, budget, description, imageUrl} = body as{
        title:string,
        director:string,
        duration:number,
        budget:number,
        description:string,
        imageUrl:string
    };

    film.title = title;
    film.director = director;
    film.duration = duration;
    film.budget = budget;
    film.description = description;
    film.imageUrl = imageUrl;

    serialize(jsonDbPath, films);
    return res.json(film);
});

export default router;