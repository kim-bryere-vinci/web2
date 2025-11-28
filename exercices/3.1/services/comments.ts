import { Comments } from "../types";
import path from "node:path";
import { parse, serialize } from "../utils/json";
import { readOne } from "./films";

const jsonDbPath = path.join(__dirname, "/../data/comments.json");

const readAllComments = (idFilm: number | undefined = undefined):Comments[] => {
    const comments = parse<Comments>(jsonDbPath);

    if(idFilm != null){
        const filterdComments = comments.filter((comment) => comment.filmId === idFilm);

        return filterdComments;
    }
    return comments;
}

const addComment = (comment: Comments): Comments => {
    const comments = parse<Comments>(jsonDbPath);

    const film = readOne(comment.filmId);

    if(film == undefined) throw new Error("Not found!");

    const userAlreadyComment = comments.find((commentFound) => commentFound.filmId === comment.filmId && commentFound.username === comment.username);

    if(userAlreadyComment) throw new Error("Conflict");

    comments.push(comment);

    serialize(jsonDbPath, comments);

    return comment;
}

const removeComment = (idFilm: number, username: string): Comments => {
    const comments = parse<Comments>(jsonDbPath);

    const film = readOne(idFilm);

    if(film == undefined) throw new Error("Not found!");

    const indexFilm = comments.findIndex((comment) => comment.filmId === idFilm && comment.username === username);

    if(indexFilm == -1) throw new Error("Not found!");

    const deletedComment = comments.splice(indexFilm, 1);

    serialize(jsonDbPath, comments);

    return deletedComment[0];
}

export { removeComment, readAllComments, addComment};