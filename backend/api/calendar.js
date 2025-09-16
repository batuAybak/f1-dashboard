import {
  getAllRaces,
  getRaceByMeeting,
  getRaceDetails,
} from "#db/queries/calendar";
import express from "express";
const calendarRouter = express.Router();
export default calendarRouter;

calendarRouter.route("/").get(async (req, res) => {
  const races = await getRaceByOfficialName();
  return res.send(races);
});

calendarRouter.param("meeting", async (req, res, next, meeting) => {
  const race = await getRaceByMeeting(meeting);
  if (!race) return res.status(404).send("No race found");
  req.race = race;
  next();
});

calendarRouter.route("/:meeting").get(async (req, res) => {
  return res.send(req.race);
});
