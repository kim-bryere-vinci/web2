import express from "express";
import { Film, NewFilm } from "../types";
import { createOne, deleteOne, readAll, readOne, updateOne } from "../services/films"
import { authorize, isAdmin } from "../utils/auths";


const router = express.Router();


/**
 * GET ALL The films
 */
router.get("/", (_req, res) => {
    const films = readAll();
    return res.json(films);
})

/**
 * GET a film by his id
 */
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    if(isNaN(id)) return res.sendStatus(400);

    const film = readOne(id);

    if(!film) return res.sendStatus(404);

    return res.json(film);
});

/**
 * POST a new film
 */
router.post("/",authorize, isAdmin, (req, res) =>{
    const body = req.body;

    if(
        !body ||
        typeof body !== "object" || 
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) || 
        ("budget" in body && typeof body.budget !== "number" || body.budget <= 0) ||
        ("description" in body && (typeof body.description !== "string" || !body.description.trim())) ||
        ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" || 
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim()
    ){
        return res.sendStatus(400);
    }

    const {title, director, duration, budget, description, imageUrl} = body as NewFilm;

    const newFilm = createOne({title, director, duration, budget, description, imageUrl});

    if(newFilm == undefined){
        return res.send(409)
    }

    return res.json(newFilm);
})


/**
 * DELETE a film
 */
router.delete("/:id", authorize, isAdmin, (req, res) => {
    const id = Number(req.params.id);


    const deletedFilm = deleteOne(id);

    if(!deletedFilm) return res.send(404);

    return res.status(200).send("The film has been deleted successfully");
})

/**
 * UPDATE a film
 */
router.put("/:id", authorize, isAdmin, (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    if(
        !body ||
        typeof body !== "object" || 
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) || 
        ("budget" in body && typeof body.budget !== "number" || body.budget <= 0) ||
        ("description" in body && (typeof body.description !== "string" || !body.description.trim())) ||
        ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" || 
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim()
    ){
        return res.sendStatus(400);
    }

    const {title, director, duration, budget, description, imageUrl} = body as Partial<Film>;

    const update = updateOne(id, {title, director, duration, budget, description, imageUrl});

    if(update == undefined) return res.status(404).send("The movie already exist or is not found");

    return res.json(update);
})



export default router;