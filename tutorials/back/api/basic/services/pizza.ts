import path from "node:path";
import { Pizza, NewPizza } from "../types";
import { parse,serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/pizza.json");

const defaultPizzas: Pizza[] = [
    {
        id: 1,
        title: "4 fromages",
        content: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates",
      },
      {
        id: 2,
        title: "Vegan",
        content: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
      },
      {
        id: 3,
        title: "Vegetarian",
        content: "Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives",
      },
      {
        id: 4,
        title: "Alpage",
        content: "Gruyère, Mozarella, Lardons, Tomates",
      },
      {
        id: 5,
        title: "Diable",
        content: "Tomates, Mozarella, Chorizo piquant, Jalapenos",
      }
];

function readAllPizaa(order: string | undefined):Pizza[]{
    const orderByTitle = order && order.includes("title") ? order: undefined;

    let orderedMenu: Pizza[] = [];
    const pizzas = parse(jsonDbPath, defaultPizzas);
    if(orderByTitle){
        orderedMenu = [...pizzas].sort((a,b) => a.title.localeCompare(b.title));
    }

    if(orderByTitle == "-title") orderedMenu = orderedMenu.reverse();

    return orderedMenu.length === 0 ? pizzas: orderedMenu; // si orderedMenu est vide alors on renvoit pizzas
}

function readPizzaById(id: number): Pizza | undefined{
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const find = pizzas.find((pizza) => pizza.id === id);

    if(!find) return undefined;

    return find;
    //ou return pizzas.find((pizza) => pizza.id === id);
}

function createPizza(newPizza: NewPizza): Pizza{
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const lastId = pizzas[pizzas.length-1].id;
    const pizza:Pizza = {id: lastId +1, ...newPizza};
    const updatesPizzas = [...pizzas, pizza];
    serialize(jsonDbPath, updatesPizzas);
    return pizza;
}

function deletedPizza(id: number): Pizza | undefined{
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const index = pizzas.findIndex((pizza) => pizza.id === id);
    if(index == -1) return undefined;

    const deletedElement = pizzas.splice(index, 1);
    serialize(jsonDbPath, pizzas);
    return deletedElement[0];
}

function updatedPizza(id: number, updatePizza: Partial<NewPizza>): Pizza | undefined{
    const pizzas = parse(jsonDbPath, defaultPizzas);
    const pizza = pizzas.find((pizza) => pizza.id === id);
    if(!pizza) return undefined;

    if(updatePizza.title !== undefined) pizza.title = updatePizza.title;

    if(updatePizza.content !== undefined) pizza.content = updatePizza.content;

    serialize(jsonDbPath, pizzas);

    return pizza;
}

export {
    readAllPizaa, readPizzaById, deletedPizza, updatedPizza, createPizza
};

