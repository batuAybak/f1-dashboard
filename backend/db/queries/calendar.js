import db from "#db/client";

export async function getAllRaces() {
  const SQL = `
    SELECT * 
    FROM calendar
    `;
  const { rows: races } = await db.query(SQL);
  return races;
}

export async function getRaceByMeeting(meeting) {
  const SQL = `
    SELECT * 
    FROM calendar
    WHERE meeting_key = $1
    `;
  const { rows: races } = await db.query(SQL, [meeting]);
  return races;
}
