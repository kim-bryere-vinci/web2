

enum Level{
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}
interface Texte{
  id: string,
  content: string,
  level: Level
}


type NewText = Omit<Texte, "id">;
export {Level};
export type { Texte, NewText };
