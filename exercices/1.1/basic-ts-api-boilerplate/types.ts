
interface films {
  id : number;
  title : string;
  director : string;
  duration : number;
  budget? : number;
  description?: string;
  imageUrl?: string;
}

type NewFilm = Omit<films, "id">

export type { films };
