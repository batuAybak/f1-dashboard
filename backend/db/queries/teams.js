
import db from "#db/client";

/**
 * Get all teams from the teams table.
 */
export async function getAllTeams() {
  const SQL = `
    SELECT * 
    FROM teams
    `;
  const { rows: drivers } = await db.query(SQL);
  return drivers;
}

/**
 * Get a single team by id.
 */
export async function getTeamById(id) {
  const SQL = `
    SELECT * 
    FROM teams
    WHERE id = $1
    `;
  const {
    rows: [team],
  } = await db.query(SQL, [id]);
  return team;
}

/**
 * Get a single team by team name.
 */
export async function getTeamByName(teamName) {
  const SQL = `
    SELECT * 
    FROM teams
    WHERE team_name = $1
    `;
  const {
    rows: [team],
  } = await db.query(SQL, [teamName]);
  return team;
}

/**
 * Get all drivers for a given team name.
 */
export async function getTeamDrivers(teamName) {
  const SQL = `
    SELECT * 
    FROM drivers
    WHERE team_name = $1
    `;
  const { rows: drivers } = await db.query(SQL, [teamName]);
  return drivers;
}