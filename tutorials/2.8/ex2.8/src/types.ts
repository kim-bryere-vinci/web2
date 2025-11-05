interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface Drink{
  title: string,
  image: string,
  volume: string,
  price: string
}

type NewPizza = Omit<Pizza, "id">;

export type { Pizza, NewPizza, Drink };
