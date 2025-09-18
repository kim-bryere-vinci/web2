import { Router } from "express";

import { films } from "../types";

const router = Router();


const defaultFilms : films[] = [
    {
        id: 1, 
        title: "Harry potter", 
        director: "Kim BRYERE", 
        duration: 120
    },
    {
        id: 1, 
        title: "Friends", 
        director: "Kim BRYERE", 
        duration: 120
    },
    {
        id: 1, 
        title: "It", 
        director: "Kim BRYERE", 
        duration: 120
    }
];

/**
 * READ ALL : lire toutes les ressources de la collection
 */
router.get("/", (_req, res) =>{
    res.status(200).json(defaultFilms);
});

export default router;