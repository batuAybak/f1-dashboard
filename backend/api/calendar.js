import { getAllRaces, getRaceByCircuit } from "#db/queries/calendar";
import express from "express";
const calendarRouter = express.Router();
export default calendarRouter;
import { results } from "#db/data/results";

calendarRouter.route("/").get(async (req, res) => {
  const races = await getAllRaces();
  return res.send(races);
});

calendarRouter.param("meetingKey", async (req, res, next, meetingKey) => {
  const race = await getRaceByCircuit(meetingKey);
  if (!race) return res.status(404).send("No race found");
  req.race = race;
  next();
});

calendarRouter.route("/:meetingKey").get(async (req, res) => {
  const meetingKey = parseInt(req.params.meetingKey, 10);
  const filtered = results.filter(
    (result) => result.meeting_key === meetingKey
  );
  return res.send([req.race, filtered]);
});
