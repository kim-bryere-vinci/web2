import jwt from "jsonwebtoken";
import path from "node:path";
import { parse, serialize } from "../utils/json";
import { AuthenticatedUser, User} from "../types";
import bcrypt from "bcrypt";

const jwtSecret = "ilovefilm!";
const lifetimeJwt = 24 * 60 * 60 * 1000;

const saltRounds = 10;

const jsonDBPath = path.join(__dirname, "/../data/users.json");

const defaultsUsers: User[] = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin", saltRounds)
  },
  {
    id: 2,
    username: "admin2",
    password: bcrypt.hashSync("admin2", saltRounds)
  }

];

async function login(
  username: string,
  password: string
): Promise<AuthenticatedUser | undefined> {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;
  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt } // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser: AuthenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username: string, password: string): Promise<AuthenticatedUser | undefined>{
  const userFound = readOneUserFromUsername(username);
  if(userFound) return undefined;

  await createOneUser(username, password);

  const token = await jwt.sign({username}, jwtSecret, {expiresIn: lifetimeJwt});

  const authenticatedUser: AuthenticatedUser = {
    username,
    token
  }

  return authenticatedUser
}

function readOneUserFromUsername(username: string){
  const users = parse(jsonDBPath, defaultsUsers);

  const userFound = users.find((user) => user.username === username);

  if(!userFound) return undefined;

  return userFound;
}

async function createOneUser(username : string, password: string){
  const users = parse(jsonDBPath, defaultsUsers);

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  const nextId = users.reduce((id, user) => (user.id > id ? user.id : id), 0) + 1;

  const createUser: User = {
    id: nextId,
    username,
    password: hashPassword
  }

  users.push(createUser);

  serialize(jsonDBPath, users);

  return createUser;
}

export {login, register, readOneUserFromUsername};
