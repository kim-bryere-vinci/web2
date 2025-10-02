import path from "node:path";
import { Texte, Level, NewText } from "../types";
import {parse, serialize} from "../utils/json";
import { v4 as uuidv4 } from "uuid";
const jsonDbPath = path.join(__dirname, "/../data/texte.json");

const defaultText: Texte[] = [
    {
        id: uuidv4(),
        content: "ffenjkvefnjvnefjknvjkef nnzk nefkn kzn kez ",
        level: Level.EASY
    },
    {
        id: uuidv4(),
        content: "ffenjkvefnjvnefjknvjkef nnzk nefkn kzn kez ",
        level: Level.MEDIUM
    },
    {
        id: uuidv4(),
        content: "ffenjkvefnjvnefjknvjkef nnzk nefkn kzn kez ",
        level: Level.HARD
    }
];

function readAll(level: Level | undefined): Texte[]{
    const textes = parse(jsonDbPath, defaultText);
    if(level != undefined){
        const filtre = textes.filter((texte) => texte.level === level);
        return filtre;
    }
    return textes;
}

function readOne(id: string): Texte | undefined{
    const textes = parse(jsonDbPath, defaultText);
    const text = textes.find((texte) => texte.id === id);

    if(!text) return undefined;

    return text;
}

function createOna(newTexte: NewText): Texte | undefined{
    const textes = parse(jsonDbPath, defaultText);

    const matchintexte = textes.find((text) => text.content.toLocaleLowerCase() === newTexte.content.toLocaleLowerCase());
    // ici on vérifie si un texte a déjà un contenu qui est similaire a celui de newTexte
    //pour les comparer on doit mettre tous les deux toLowerCase()

    if(matchintexte) return undefined;

    const texte = {id: uuidv4(), ...newTexte};

    textes.push(texte);
    serialize(jsonDbPath, textes);
    return texte;
}

function deleteTexte(id: string): Texte | undefined{
    const textes = parse(jsonDbPath, defaultText);
    const findTexte = textes.findIndex((texte) => texte.id === id);
    if(findTexte === -1) return undefined;

    const deletedTexte = textes.splice(findTexte, 1);
    serialize(jsonDbPath, textes);
    return deletedTexte[0];
}

function updateOne(id: string, newTexte: NewText): Texte | undefined | null{
    const textes = parse(jsonDbPath, defaultText);
    const findTexte = textes.find((texte) => texte.id === id);

    if(!findTexte) return undefined;

    const matchintexte = textes.find((text) => text.content.toLocaleLowerCase() === newTexte.content.toLocaleLowerCase());

    if(matchintexte) return null;

    findTexte.content = newTexte.content;
    findTexte.level = newTexte.level;

    serialize(jsonDbPath, textes);
    return findTexte;
}


export { readAll, readOne, createOna, deleteTexte, updateOne };