import { Request } from "express"

interface AuthenticatedUser{
  username: string,
  token: string
}

interface User{
  id: number,
  username:string,
  password: string
}

interface AuthenticatedRequest extends Request{
  user?: User;
}

interface JwtPayload{
  username: string,
  exp: number,
  iat: number
}

type PotentialUser = Omit<User, "id">;

interface Film{
  id: number,
  title: string,
  director: string,
  duration: number,
  budget?: number,
  description?: string,
  imageUrl: string
}

type NewFilm = Omit<Film, "id">;



export type {Film, NewFilm, AuthenticatedUser, User, PotentialUser, AuthenticatedRequest, JwtPayload};
