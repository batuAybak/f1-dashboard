import { getAllRaces, getRaceByCircuit } from "#db/queries/calendar";
import express from "express";
const calendarRouter = express.Router();
export default calendarRouter;

calendarRouter.route("/").get(async (req, res) => {
  const races = await getAllRaces();
  return res.send(races);
});

calendarRouter.param("circuit", async (req, res, next, circuit) => {
  const race = await getRaceByCircuit(circuit);
  if (!race) return res.status(404).send("No race found");
  req.race = race;
  next();
});

calendarRouter.route("/:circuit").get(async (req, res) => {
  return res.send(req.race);
});
