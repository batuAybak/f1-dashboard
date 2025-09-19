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
  .delete(requireUser, requireBody(["driver_id"]), async (req, res) => { // Delete driver from user's favorite drivers
    const user = req.user;
    const { driver_id } = req.body;
    const removed = await deleteUserFavoriteDriver(user.id, driver_id);
    res.send({ removed });
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

driversRouter.use(async (err, req, res, next) => {
  console.log(err); //Log error on console
  res.status(400).send(`Error on driversRouter: ${err}`); // log error on response
});
