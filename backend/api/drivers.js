import { getAllDrivers, getDriverById } from "#db/queries/drivers";
import { addUserFavoriteDriver, deleteUserFavoriteDriver } from "#db/queries/userFavorites";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import express from "express";
const driversRouter = express.Router();
export default driversRouter;

driversRouter
  .route("/")
  .get(async (req, res) => { // Display all drivers
    const allDrivers = await getAllDrivers();
    res.send(allDrivers);
  })

driversRouter.param("id", async (req, res, next, id) => {
  //Parameter validation
  const driver = await getDriverById(id);
  if (!driver) res.status(404).send("No driver found");
  req.driver = driver;
  next();
});

driversRouter
  .route("/:id")
  .get(async (req, res) => { // Display driver by id
    res.send(req.driver);
  })
  .post(requireUser, async (req, res) => { // Add driver to user's favorite drivers
    const favoriteDriver = await addUserFavoriteDriver(
      req.user.id,
      req.driver.driver_number
    );
    res.send(favoriteDriver);
  })
  .delete(requireUser, async (req, res) => { // Delete driver from user's favorite drivers
    // req.user.id comes from requireUser middleware
    // req.driver.driver_number comes from param middleware above
    // No need to pass anything in the body of the request here 
    // since we have both values we need from the middlewares
    const removed = await deleteUserFavoriteDriver(req.user.id, req.driver.driver_number);
    res.send({ removed });
  })

driversRouter.use(async (err, req, res, next) => {
  console.log(err); //Log error on console
  res.status(400).send(`Error on driversRouter: ${err}`); // log error on response
});
