import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import requireUser from "#middleware/requireUser";
import {
  getUserFavoriteDriver,
  deleteUserFavoriteDriver,
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
  .get(requireUser, async (req, res) => {
    const user = req.user;
    const userFavorites = await getUserFavoriteDriver(user.id);
    res.send({ user, userFavorites });
  })
  .delete(requireUser, async (req, res) => {
    const user = req.user;
    const { driverId } = req.body;
    const removed = await deleteUserFavoriteDriver(user.id, driverId);
    res.send({ removed });
  });
