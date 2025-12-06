import { Request } from "express";


interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
}

interface AuthenticatedRequest extends Request{
  user?: User;
}

interface JwtPayload{
  username: string,
  exp: number,
  iat: number
}


interface User{
  id: number,
  username: string,
  password: string
}

type PotentialUsers = Omit<User, "id">

interface AuthenticatedUser{
  username: string,
  token: string
}
type NewFilm = Omit<Film, "id">;

export type { Film, NewFilm, User, AuthenticatedUser, PotentialUsers, AuthenticatedRequest, JwtPayload };
