
import { getAllRaces, getRaceByCircuit } from "#db/queries/calendar";
import express from "express";
const calendarRouter = express.Router();
export default calendarRouter;
import { results } from "#db/data/results";

/**
 * Calendar API router for race calendar endpoints.
 * Provides endpoints to get all races and details for a specific race.
 */


// GET /calendar - Get all races
calendarRouter.route("/").get(async (req, res) => {
  const races = await getAllRaces();
  return res.send(races);
});


// Param middleware: fetch race by meetingKey
calendarRouter.param("meetingKey", async (req, res, next, meetingKey) => {
  const race = await getRaceByCircuit(meetingKey);
  if (!race) return res.status(404).send("No race found");
  req.race = race;
  next();
});


// GET /calendar/:meetingKey - Get details and results for a specific race
calendarRouter.route("/:meetingKey").get(async (req, res) => {
  const meetingKey = parseInt(req.params.meetingKey, 10);
  // Filter results for this meetingKey
  const filtered = results.filter(
    (result) => result.meeting_key === meetingKey
  );
  return res.send([req.race, filtered]);
});
