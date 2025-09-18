import db from "#db/client";

export async function getAllRaces() {
  const SQL = `
    SELECT * 
    FROM calendar
    `;
  const { rows: races } = await db.query(SQL);
  return races;
}

export async function getRaceByCircuit(circuit) {
  const SQL = `
    SELECT * 
    FROM calendar
    WHERE circuit_short_name = $1
    `;
  const {
    rows: [race],
  } = await db.query(SQL, [circuit]);
  return race;
}
