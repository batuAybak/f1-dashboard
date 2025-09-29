import { results } from "#db/data/results";
import { getDriverById } from "#db/queries/drivers";
import express from "express";
const standingsRouter = express.Router();
export default standingsRouter;

standingsRouter.route("/").get(async (req, res) => {
  const driver = {};

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

standingsRouter.param("driverNumber", async (req, res, next, id) => {
  const driver = await getDriverById(id);
  if (!driver) res.status(404).send("No driver found");
  req.driver = driver;
  next();
});

standingsRouter.route("/:driverNumber").get(async (req, res) => {
  const driverNumber = req.driver.driver_number;
  const filterDriver = results.filter(
    (driver) => driver.driver_number === driverNumber
  );
  return res.send(filterDriver);
});
