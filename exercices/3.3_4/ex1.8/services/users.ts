import jwt from "jsonwebtoken";
import path from "node:path";
import { parse, serialize } from "../utils/json";
import { User, AuthenticatedUser } from "../types";

const jwtSecret = "ilovemovies";
const lifetimeJwt = 24*60*60*1000;

const jsonDbPath = path.join(__dirname, "/../data/users.json");

const defaultUserss: User[]= [
    {
        id:1,
        username: "admin",
        password: "admin"
    }
]

function login( username: string, password: string): AuthenticatedUser | undefined{
    const userFound = readOneUserFromUsername(username);

    if(!userFound) return undefined;

    if(userFound.password !== password) return undefined;

    const token = jwt.sign({username}, jwtSecret, {expiresIn: lifetimeJwt});

    const authenticatedUser: AuthenticatedUser = {
        username, token
    }

    return authenticatedUser;
}

function register( username : string, password: string): AuthenticatedUser | undefined{
    const userfound= readOneUserFromUsername(username);

    if(userfound) return undefined;

    createOneUser(username, password);

    const token = jwt.sign(
        {username}, jwtSecret, {expiresIn: lifetimeJwt}
    );

    const authenticatedUser: AuthenticatedUser = { username, token};

    return authenticatedUser;
}

function readOneUserFromUsername(username: string){
    const users = parse(jsonDbPath, defaultUserss);

    const userfound = users.find((user) => user.username === username);

    if(!userfound) return undefined;

    return userfound
}

function createOneUser(username: string, password: string){
    const users = parse(jsonDbPath, defaultUserss);

    const nextId = users.reduce((acc, user) => (user.id > acc ? user.id : acc), 0) + 1;

    const createdUser: User = {
        id: nextId,
        username,
        password
    }

    users.push(createdUser);

    serialize(jsonDbPath, users);

    return createdUser;
}

export {login, register, readOneUserFromUsername}