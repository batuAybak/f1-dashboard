import db from "#db/client";

export async function userFavoriteDriver(userId, driverId) {
  const SQL = `
    INSERT INTO user_favorites (user_id, driver_id)
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
    INSERT INTO user_favorites (user_id, team_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [favorite],
  } = await db.query(SQL, [userId, teamId]);
  return favorite;
}
