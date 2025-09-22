import db from "#db/client";

// export async function getUserFavorites(userId) {
//   const SQL = `
//     SELECT user_id, driver_id, team_id
//     FROM favorite_drivers
//     JOIN favorite_teams USING (user_id)
//     WHERE user_id = $1
//     `;
//   const {
//     rows: [favorites],
//   } = await db.query(SQL, [userId]);
//   return favorites;
// }

export async function getUserFavoriteDriver(userId) {
  const SQL = `
  SELECT d.*
  FROM favorite_drivers f
  JOIN drivers d ON f.driver_id = d.driver_number
  WHERE f.user_id = $1
  `;
  const {
    rows: [driver],
  } = await db.query(SQL, [userId]);
  return driver;
}

export async function getUserFavoriteTeam(userId) {
  const SQL = `
  SELECT t.*
  FROM favorite_teams f
  JOIN teams t ON f.team_id = t.id
  WHERE f.user_id = $1
  `;
  const {
    rows: [team],
  } = await db.query(SQL, [userId]);
  return team;
}

export async function addUserFavoriteDriver(userId, driverId) {
  const SQL = `
    INSERT INTO favorite_drivers (user_id, driver_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [favorite],
  } = await db.query(SQL, [userId, driverId]);
  return favorite;
}

export async function addUserFavoriteTeam(userId, teamId) {
  const SQL = `
    INSERT INTO favorite_teams (user_id, team_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [favorite],
  } = await db.query(SQL, [userId, teamId]);
  return favorite;
}

export async function deleteUserFavoriteDriver(userId, driverId) {
  const SQL = `
    DELETE FROM favorite_drivers
    WHERE user_id = $1 AND driver_id = $2
    RETURNING *
    `;
  const {
    rows: [favoriteDriver],
  } = await db.query(SQL, [userId, driverId]);
  return favoriteDriver;
}

export async function deleteUserFavoriteTeam(userId, teamId) {
  const SQL = `
    DELETE FROM favorite_teams
    WHERE user_id = $1 AND team_id = $2
    RETURNING *
    `;
  const {
    rows: [favoriteTeam],
  } = await db.query(SQL, [userId, teamId]);
  return favoriteTeam;
}
