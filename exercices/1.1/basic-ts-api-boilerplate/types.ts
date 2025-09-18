
interface films {
  id : number;
  title : string;
  director : string;
  duration : number;
  budget? : number;
  description?: string;
  imageUrl?: string;
}

export type { films };
