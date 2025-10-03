
import db from "#db/client";

/**
 * Get all races from the calendar table, ordered by start date.
 */
export async function getAllRaces() {
  const SQL = `
    SELECT * 
    FROM calendar
    ORDER BY date_start
    `;
  const { rows: races } = await db.query(SQL);
  return races;
}

/**
 * Get a single race from the calendar table by meeting key.
 */
export async function getRaceByCircuit(meetingKey) {
  const SQL = `
    SELECT * 
    FROM calendar
    WHERE meeting_key = $1
    `;
  const {
    rows: [race],
  } = await db.query(SQL, [meetingKey]);
  return race;
}
