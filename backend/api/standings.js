
import { results } from "#db/data/results";
import { getDriverById } from "#db/queries/drivers";
import express from "express";
const standingsRouter = express.Router();
export default standingsRouter;

/**
 * Standings API router for driver standings endpoints.
 * Provides endpoints to get all driver standings and results for a specific driver.
 */


// GET /standings - Get all driver standings (total points per driver)
standingsRouter.route("/").get(async (req, res) => {
  const driver = {};

  // Aggregate points for each driver
  results.forEach((race) => {
    if (!driver[race.driver_number]) {
      driver[race.driver_number] = {
        driver_number: race.driver_number,
        points: 0,
      };
    }

    driver[race.driver_number].points += race.points;
    if (!race.points) {
      race.points = 0;
    }
  });

  const driverArray = Object.values(driver);
  res.send(driverArray);
});


// Param middleware: fetch driver by driverNumber
standingsRouter.param("driverNumber", async (req, res, next, id) => {
  const driver = await getDriverById(id);
  if (!driver) res.status(404).send("No driver found");
  req.driver = driver;
  next();
});


// GET /standings/:driverNumber - Get all race results for a specific driver
standingsRouter.route("/:driverNumber").get(async (req, res) => {
  const driverNumber = req.driver.driver_number;
  // Filter results for this driver
  const filterDriver = results.filter(
    (driver) => driver.driver_number === driverNumber
  );
  return res.send(filterDriver);
});
