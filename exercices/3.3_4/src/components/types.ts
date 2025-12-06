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
    onMovieAdded: (newMovie: NewMovie) => void;
    onMovieDeleted: (movie: Movie) => void;
    registerUser: (newUser: User) => Promise<void>;
    loginUser: (user: User) => Promise<void>;
    authenticatedUser: MaybeAuthenticated;
}

type NewMovie = Omit<Movie, "id">;

export type {Movie, MovieContext, NewMovie, User, AuthenticatedUser, MaybeAuthenticated};