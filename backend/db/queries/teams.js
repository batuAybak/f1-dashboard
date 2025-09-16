import db from "#db/client";

export async function getAllTeams() {
  const SQL = `
    SELECT * 
    FROM teams
    `;
  const { rows: drivers } = await db.query(SQL);
  return drivers;
}

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

export async function getTeamDrivers(teamName) {
  const SQL = `
    SELECT * 
    FROM drivers
    WHERE team_name = $1
    `;
  const { rows: drivers } = await db.query(SQL, [teamName]);
  return drivers;
}