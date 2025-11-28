import { Router } from "express";
import { Comments } from "../types";
import { readAllComments, addComment, removeComment } from "../services/comments";
import { authorize } from "../utils/auths";

const router = Router();

/**
 * GET all the comments filtered
 */
router.get("/",(req, res) => {
    const idFilm = "filmId" in req.query ? Number(req.query["filmId"]) : undefined;

    const films = readAllComments(idFilm);

    return res.send(films);
})

/**
 * POST a new comment
 */
router.post("/", authorize, (req, res) => {
    const body: unknown = req.body;

    if(
        !body || typeof body !== "object" || 
        !("filmId" in body) || typeof body.filmId !== "number" || 
        !("comment" in body) || typeof body.comment !== "string" || 
        !body.comment.trim() || !("user" in req)  || typeof req.user !== "object" ||
         !req.user ||!("username" in req.user) || typeof req.user.username !== "string"
    ){
        return res.status(400);
    }


    const newComment: Comments = {
        filmId: body.filmId,
        username: req.user.username,
        comment: body.comment
    };


    try{
        const commentCreated = addComment(newComment);
        return res.send(commentCreated);
    }catch(error){
        if(!(error instanceof Error)){
            return res.sendStatus(500);
        }
        if(error.message === "Not found!" ) return res.sendStatus(404);
        if(error.message === "Conflict") return res.sendStatus(409);
        return res.sendStatus(500);
    }
})

/**
 * DELETE a comment
 */
router.delete("/films/:id", authorize, (req, res) => {
    const idFilm = Number(req.params.id);

    if(idFilm <= 0 || !("user" in req)  || typeof req.user !== "object" || !req.user ||!("username" in req.user) || typeof req.user.username !== "string"){
        return res.sendStatus(400);
    }
    const user = req.user.username;

    try{
        const deletedComment = removeComment(idFilm, user);
        return res.send(deletedComment);
    }catch(error){
        if(!(error instanceof Error)) return res.sendStatus(500);
        if(error.message === "Not found!") return res.sendStatus(404);
        return res.sendStatus(500);
    }
})

export default router;