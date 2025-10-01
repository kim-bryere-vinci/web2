interface Film {
  id : number;
  title : string;
  director : string;
  duration : number;
  budget? : number;
  description?: string;
  imageUrl?: string;
}
type NewFilms = Omit<Film, "id">;

export type { Film, NewFilms };
