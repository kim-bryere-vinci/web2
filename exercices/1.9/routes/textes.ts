import {Level, NewText } from "../types";
import { readAll, readOne, createOna, deleteTexte, updateOne } from "../services/textes";
import { Router } from "express";
import { isString } from "../utils/type-guards";
const router = Router();
const expectedLevel = ["easy", "medium", "hard"];

router.get("/", (req, res) => {
    const filtreRaw = req.query.level;
    let filtre: Level | undefined;

    if(typeof filtreRaw === "string"){
        if(Object.values(Level).includes(filtreRaw as Level)){
            filtre = filtreRaw as Level;
        }
    }
    
    const textes = readAll(filtre);
    return res.json(textes) ;
});

router.get("/:id", (req, res) =>{
    const id = req.params.id;
    if(!isString(id)){
        return res.sendStatus(400);
    }

    const texte = readOne(id);
    if(!texte) return res.sendStatus(404);

    return res.json(texte);
});

router.post("/", (req, res) =>{
    const body: unknown = req.body;

    if(!body || 
        typeof body  !== "object"||
        !("content" in body) || 
        !("level" in body) || 
        typeof body.content !== "string" ||
        typeof body.level !== "string" || 
        !body.content.trim() ||
        !expectedLevel.includes(body.level)

    ) return res.sendStatus(400);

    const {content, level} = body as NewText;

    const texte = createOna({content, level});
    if(texte == undefined){
        return res.sendStatus(409);
    }

    return res.json(texte);
});

router.delete("/:id", (req, res) =>{
    const id = req.params.id;
    if(!isString(id)) return res.sendStatus(400);

    const texte = deleteTexte(id);
    if(texte === undefined) return res.sendStatus(404);

    return res.json(texte);
});

router.put("/:id", (req, res) =>{
    const id = req.params.id;
    const body: unknown= req.body;
    if(!body || 
        typeof body  !== "object"||
        !("content" in body) || 
        !("level" in body) || 
        typeof body.content !== "string" ||
        typeof body.level !== "string" || 
        !body.content.trim() ||
        !expectedLevel.includes(body.level)

    ) return res.sendStatus(400);

    const { content, level } = body as NewText;

    if(!isString(id)) return res.sendStatus(400);

    const texte = updateOne(id, { content, level } );
    if(texte === null) return res.sendStatus(409);
    if(texte === undefined) return res.sendStatus(404);
    return res.json(texte);
});


export default router;