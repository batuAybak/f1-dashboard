
import express from "express";
const router = express.Router();
export default router;

/**
 * Users API router for authentication and profile endpoints.
 * Provides endpoints for user registration, login, and profile retrieval.
 */

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import requireUser from "#middleware/requireUser";
import {
  getUserFavoriteDriver,
  getUserFavoriteTeam
} from "#db/queries/userFavorites";


// POST /users/register - Register a new user
router
  .route("/register")
  .post(
    requireBody(["username", "password", "first_name", "last_name"]),
    async (req, res) => {
      const { username, password, first_name, last_name } = req.body;
      const user = await createUser(username, password, first_name, last_name);

      // Create JWT token for the new user
      const token = await createToken({ id: user.id });
      res.status(201).send(token);
    }
  );


// POST /users/login - Log in a user
router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    // Create JWT token for the logged-in user
    const token = await createToken({ id: user.id });
    res.send(token);
  });


// GET /users/profile - Get user profile with favorite driver and team
router
  .route("/profile")
  .get(requireUser, async (req, res) => { // Get user profile with favorite driver and team
    const user = req.user;
    const userFavoriteDriver = await getUserFavoriteDriver(user.id);
    const userFavoriteTeam = await getUserFavoriteTeam(user.id);
    res.send({ user, userFavoriteDriver, userFavoriteTeam });
  })

