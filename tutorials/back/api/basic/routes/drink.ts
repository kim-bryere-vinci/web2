import { Router } from "express";
import { NewDrink } from "../types";
import{
  readAllDrinks,
  createOneDrink,
  readOneDrink,
  deleteOneDrink, 
  updateOneDrink
}from "../services/drinks";
import { isNumber } from "../utils/type-guards";

const router = Router();

router.get("/", (req, res) => {
  const budgetMax = Number(req.query["budget-max"]);
  const filtreBoisson = readAllDrinks(budgetMax);
  return res.json(filtreBoisson);

});

export default router;

router.get("/:id", (req, res) =>{
  const id = Number(req.params.id);
  const drink = readOneDrink(id);
  if(!drink){
    return res.sendStatus(404);
  }
  return res.json(drink);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("image" in body) ||
    !("volume" in body) ||
    !("price" in body) ||
    typeof body.title !== "string" ||
    typeof body.image !== "string" ||
    typeof body.volume !== "number" ||
    typeof body.price !== "number" ||
    !body.title.trim() ||
    !body.image.trim() ||
    body.volume <= 0 ||
    body.price <= 0
  ) {
    return res.sendStatus(400);
  }

  const { title, image, volume, price } = body as NewDrink;
  
  const newDrink = createOneDrink({ title, image, volume, price });
  return res.json(newDrink);
});

router.delete("/:id", (req, res) =>{
  const id = Number(req.params.id);
  if(!isNumber(id)) return res.sendStatus(400);

  const deletedDrink = deleteOneDrink(id);
  if(!deletedDrink) return res.sendStatus(404);

  return res.json(deletedDrink);
});

router.patch("/:id", (req, res) =>{
  const id = Number(req.params.id);
  if(!isNumber(id)) return res.sendStatus(400);

  const body: unknown = req.body;

  if(
    !body || typeof body !== "object" ||
    ("title" in body && (typeof body.title !== "string" || !body.title.trim())) ||
    ("image" in body && (typeof body.image !== "string" || !body.image.trim())) ||
    ("volume" in body && (typeof body.volume !== "number" || body.volume <= 0)) || 
    ("price" in body && (typeof body.price !== "number" || body.price <= 0))
  ){
    return res.sendStatus(400);
  }

  const {title, image, volume, price} : Partial<NewDrink> = body;

  const drink = updateOneDrink(id, {title, image, volume, price});

  if(!drink) return res.sendStatus(404);

  return res.json(drink);

});
