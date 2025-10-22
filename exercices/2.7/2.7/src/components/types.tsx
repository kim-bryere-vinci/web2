interface Film {
    id: number,
    titre: string,
    director: string,
    duree: number,
    imageUrl?: string,
    description?: string,
    budget?: number
}

type NewFilm = Omit<Film, "id">


export type {Film, NewFilm};