import { Router } from "express";
import {
    readAllFilms, readFilmById, deleteFilm, createFilm, updateFilm, updateOrCreateOne
} from "../services/films";

import { NewFilms } from "../types";
import { isNumber } from "../utils/type-guards";

const router = Router();

/**
 * READ ALL : lire toutes les ressources de la collection
 */
router.get("/", (req, res) =>{
    const durat = String(req.query['minimum-duration']);
    const sort = String(req.query.sort);
    const sortDuration = String(req.query.sortDuration);

    if(durat){
        const film = readAllFilms(durat);
        return res.json(film);
    }

    if(sort){
        const films = readAllFilms(sort);
        return res.json(films);
    }

    if(sortDuration){
        const films = readAllFilms(sortDuration);
        return res.json(films);
    }
    return res.json(readAllFilms(undefined));
});

router.get("/:id", (req, res) =>{
    const id = Number(req.params.id);
    const film = readFilmById(id);
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

    const film = createFilm( {title, director, duration, budget, description, imageUrl});

    if(Number(corps.duration) < 0){
        return res.sendStatus(400);
    }
    if(film == undefined) return res.sendStatus(400);

    return res.json(film);
    
});

router.delete("/:id", (req, res) =>{
    const id = Number(req.params.id);
    if(!isNumber(id)) return res.sendStatus(400);

    const filmDeleted = deleteFilm(id);
    if(!filmDeleted) return res.sendStatus(404);

    return res.json(filmDeleted);
});

router.patch("/:id", (req, res) =>{
    const id = Number(req.params.id);

    if(!isNumber(id)) return res.sendStatus(400);

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


    const film = updateFilm(id, {title, director, duration, budget, description, imageUrl} );
    if(!film) return res.sendStatus(404);

    return res.json(film);
});

router.put("/:id", (req, res) => {

    

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
    
  const id = Number(req.params.id);
  if(!isNumber(id)) return res.sendStatus(400);
  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const createdOrUpdatedFilm = updateOrCreateOne(id, body as NewFilms);

  if (!createdOrUpdatedFilm) {
    return res.sendStatus(409); // Film already exists
  }

  return res.send(createdOrUpdatedFilm);
});

export default router;