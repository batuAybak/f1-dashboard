import { getAllDrivers, getDriverById } from "#db/queries/drivers";
import { addUserFavoriteDriver } from "#db/queries/userFavorites";
import requireUser from "#middleware/requireUser";
import express from "express";
const driversRouter = express.Router();
export default driversRouter;

driversRouter
  .route("/") // Display all drivers
  .get(async (req, res) => {
    const allDrivers = await getAllDrivers();
    res.send(allDrivers);
  });

driversRouter.param("id", async (req, res, next, id) => {
  //Parameter validation
  const driver = await getDriverById(id);
  if (!driver) res.status(404).send("No driver found");
  req.driver = driver;
  next();
});

driversRouter
  .route("/:id") // Display driver by id
  .get(async (req, res) => {
    res.send(req.driver);
  })
  .post(requireUser, async (req, res) => {
    const favoriteDriver = await addUserFavoriteDriver(
      req.user.id,
      req.driver.driver_number
    );
    res.send(favoriteDriver);
  });

driversRouter.use(async (err, req, res, next) => {
  console.log(err); //Log error on console
  res.status(400).send(`Error on driversRouter: ${err}`); // log error on response
});
