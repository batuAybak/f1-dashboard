import { results } from "#db/data/results";
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

// standingsRouter.route("/:driverNumber").get(async (req, res) => {
//   const driverNumber = parseInt(req.params.driverNumber, 10);
//   const filterDriver = results.filter(
//     (driver) => driver.driver_number === driverNumber
//   );

//   return res.send(filterDriver);
// });
