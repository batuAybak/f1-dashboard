import db from "#db/client";

export async function userFavoriteDriver(userId, driverId) {
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

export async function userFavoriteTeam(userId, teamId) {
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
