import { Router } from "express";

import { films, NewFilms } from "../types";

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
    const durat = Number(req.query['minimum-duration']);
    if(durat){
        const result : films[] = [];
        if(durat < 0){
            res.json("Wrong minimum duration");
        }
        for(let i = 0; i < defaultFilms.length; i++){
            if(defaultFilms[i].duration === durat){
                result.push(defaultFilms[i]);
            }
        }
        res.json(result);
    }
    res.json(defaultFilms);
});

router.get("/:id", (req, res) =>{
    const id = Number(req.params.id);
    for(let i = 0; i < defaultFilms.length; i++){
        if(defaultFilms[i].id === id){
            res.json(defaultFilms[i]);
            return;
        }
    }
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

    const nextId = defaultFilms.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

    if(Number(corps.duration) < 0){
        return res.json("Wrong minimum duration");
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
    return res.json(newFilm);
    
});

export default router;