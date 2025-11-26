import { Router } from "express";
import { PotentialUser } from "../types";
import { login, register } from "../services/users";

const router = Router();

/**
 * REGISTER a user
 */
router.post("/register",async (req, res) => {
  const body = req.body;

  if(
    !body ||
    typeof body !== "object" ||
    !("username" in body) || typeof body.username !== "string" ||
    !("password" in body) || typeof body.password !== "string" ||
    !body.username.trim() ||
    !body.password.trim()
  ){
    return res.sendStatus(400);
  }

  const {username, password} = body as PotentialUser;

  const user = await register(username, password);

  if(!user) return res.sendStatus(409);

  return res.json(user);
})

/**
 * LOGIN a user
 */
router.post("/login", async (req, res) => {
  const body = req.body;

  if(
    !body ||
    typeof body !== "object" ||
    !("username" in body) || typeof body.username !== "string" ||
    !("password" in body) || typeof body.password !== "string" ||
    !body.username.trim() ||
    !body.password.trim()
  ){
    return res.sendStatus(400);
  }

  const {username, password} = body as PotentialUser;

  const user = await login(username, password);

  if(!user) return res.sendStatus(401);

  return res.json(user);
})

export default router;