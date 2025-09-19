import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import requireUser from "#middleware/requireUser";
import {
  getUserFavoriteDriver,
  getUserFavoriteTeam
} from "#db/queries/userFavorites";

router
  .route("/register")
  .post(
    requireBody(["username", "password", "first_name", "last_name"]),
    async (req, res) => {
      const { username, password, first_name, last_name } = req.body;
      const user = await createUser(username, password, first_name, last_name);

      const token = await createToken({ id: user.id });
      res.status(201).send(token);
    }
  );

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = await createToken({ id: user.id });
    res.send(token);
  });

router
  .route("/profile")
  .get(requireUser, async (req, res) => { // Get user profile with favorite driver and team
    const user = req.user;
    const userFavoriteDriver = await getUserFavoriteDriver(user.id);
    const userFavoriteTeam = await getUserFavoriteTeam(user.id);
    res.send({ user, userFavoriteDriver, userFavoriteTeam });
  })

