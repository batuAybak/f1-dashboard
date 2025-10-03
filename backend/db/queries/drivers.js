
import db from "#db/client";

/**
 * Get all drivers from the drivers table.
 */
export async function getAllDrivers() {
  const SQL = `
    SELECT * 
    FROM drivers
    `;
  const { rows: drivers } = await db.query(SQL);
  return drivers;
}

/**
 * Get a single driver by driver number.
 */
export async function getDriverById(id) {
  const SQL = `
    SELECT * 
    FROM drivers
    WHERE driver_number = $1
    `;
  const {
    rows: [driver],
  } = await db.query(SQL, [id]);
  return driver;
}

/**
 * Get a single driver by first or last name.
 */
export async function getDriverByName(firstName, lastName) {
  const SQL = `
    SELECT * 
    FROM drivers
    WHERE first_name = $1 OR last_name = $2
    `;
  const {
    rows: [driver],
  } = await db.query(SQL, [firstName, lastName]);
  return driver;
}
