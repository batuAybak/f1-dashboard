import { getAllTeams, getTeamById, getTeamDrivers } from "#db/queries/teams";
import { addUserFavoriteTeam, deleteUserFavoriteTeam } from "#db/queries/userFavorites";
import express from "express";
const teamsRouter = express.Router();
export default teamsRouter;
import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

teamsRouter
  .route("/")
  .get(async (req, res) => { // Display all teams
    const allTeams = await getAllTeams();
    res.send(allTeams);
  })
  .post(requireUser, requireBody(["id"]), async (req, res) => { // Add team to user's favorite teams
    const favoriteTeam = await addUserFavoriteTeam(req.user.id, req.body.id);
    res.send(favoriteTeam);
  })

teamsRouter.param("id", async (req, res, next, id) => {
  //Parameter validation
  const team = await getTeamById(id);
  if (!team) res.status(404).send("No team found");
  req.team = team;
  next();
});

teamsRouter
  .route("/:id")
  .get(async (req, res) => { // Display team by id
    res.send(req.team);
  })
  .delete(requireUser, async (req, res) => {
    // req.user.id comes from requireUser middleware
    // req.team.id comes from param middleware above
    // No need to pass anything in the body of the request here 
    // since we have both values we need from the middlewares
    const removed = await deleteUserFavoriteTeam(req.user.id, req.team.id);
    res.send({ removed });
  });


teamsRouter
  .route("/:id/drivers") // Display drivers by team id
  .get(async (req, res) => {
    const teamDrivers = await getTeamDrivers(req.team.team_name);
    res.send(teamDrivers);
  });

teamsRouter.use(async (err, req, res, next) => {
  console.log(err); //Log error on console
  res.status(400).send(`Error on teamsRouter: ${err}`); // log error on response
});
