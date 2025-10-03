
import db from "#db/client";

/**
 * Get the user's favorite driver (joined with driver details).
 */

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

/**
 * Get the user's favorite team (joined with team details).
 */
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

/**
 * Add a favorite driver for a user.
 */
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

/**
 * Add a favorite team for a user.
 */
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

/**
 * Delete a favorite driver for a user.
 */
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

/**
 * Delete a favorite team for a user.
 */
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
