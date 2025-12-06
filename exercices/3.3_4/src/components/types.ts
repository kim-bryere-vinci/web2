interface Movie{
    id:number,
    title: string, 
    director: string, 
    duration: number,
    imageUrl?: string,
    description?: string,
    budget?: number
}

interface User{
    username: string,
    password: string
}

interface AuthenticatedUser{
    username: string,
    token: string
}

type MaybeAuthenticated = AuthenticatedUser | undefined;

interface MovieContext{
    movies: Movie[];
    onMovieAdded: (newMovie: NewMovie) => Promise<void>;
    onMovieDeleted: (movie: Movie) => Promise<void>;
    registerUser: (newUser: User) => Promise<void>;
    loginUser: (user: User) => Promise<void>;
}

type NewMovie = Omit<Movie, "id">;

export type {Movie, MovieContext, NewMovie, User, AuthenticatedUser, MaybeAuthenticated};