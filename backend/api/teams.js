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
  .delete(requireUser, requireBody(["team_id"]), async (req, res) => {
    const user = req.user;
    const { team_id } = req.body;
    const removed = await deleteUserFavoriteTeam(user.id, team_id);
    res.send({ removed });
  });

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
  .post(requireUser, async (req, res) => { // Add team to user's favorite teams
    const favoriteTeam = await addUserFavoriteTeam(req.user.id, req.team.id);
    res.send(favoriteTeam);
  })


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
