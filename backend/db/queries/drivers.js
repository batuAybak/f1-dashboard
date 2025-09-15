import db from "#db/client";

export async function getAllDrivers() {
  const SQL = `
    SELECT * 
    FROM drivers
    `;
  const { rows: drivers } = await db.query(SQL);
  return drivers;
}

export async function getDriverById(id) {
  const SQL = `
    SELECT * 
    FROM drivers
    WHERE id = $1
    `;
  const {
    rows: [driver],
  } = await db.query(SQL, [id]);
  return driver;
}

export async function getDriversByTeamName(teamName) {
  const SQL = `
    SELECT * 
    FROM drivers
    WHERE team_name = $1
    `;
  const { rows: drivers } = await db.query(SQL, [teamName]);
  return drivers;
}

export async function getDriverByName(firstName, lastName) {
  const SQL = `
    SELECT * 
    FROM drivers
    WHERE first_name = $1 || last_name = $2
    `;
  const {
    rows: [driver],
  } = await db.query(SQL, [firstName, lastName]);
  return driver;
}
