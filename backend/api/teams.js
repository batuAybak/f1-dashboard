import { getAllTeams, getTeamById, getTeamDrivers } from "#db/queries/teams";
import { addUserFavoriteTeam } from "#db/queries/userFavorites";
import express from "express";
const teamsRouter = express.Router();
export default teamsRouter;
import requireUser from "#middleware/requireUser";

teamsRouter
  .route("/") // Display all teams
  .get(async (req, res) => {
    const allTeams = await getAllTeams();
    res.send(allTeams);
  }) // TODO: Fix favorite team functionality
  .post(requireUser, async (req, res) => {
    const team = await getTeamById(req.body.team_id);
    const favoriteTeam = await addUserFavoriteTeam(req.user.id, req.team.id);
    res.send(favoriteTeam);
  });

teamsRouter.param("id", async (req, res, next, id) => {
  //Parameter validation
  const team = await getTeamById(id);
  if (!team) res.status(404).send("No team found");
  req.team = team;
  next();
});

teamsRouter
  .route("/:id") // Display team by id
  .get(async (req, res) => {
    res.send(req.team);
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
