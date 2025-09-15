import db from "#db/client";
import { createUser } from "#db/queries/users";
import { country_codes } from "./countryCodes.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Fetch the drivers from the API
  const drivers = await fetch('https://api.openf1.org/v1/drivers?session_key=9912');
  const driversData = await drivers.json();
  // Push country codes into the driver objects
  driversData.map((driver, index) => {
    driver.country_code = country_codes[index];
    if (driver.first_name === 'Franco') { //One driver has no img file from the api, so manually pushing it.
      driver.headshot_url = "https://media.formula1.com/image/upload/c_fill,g_face,w_150,h_150/q_auto/f_png/v1740000000/common/f1/2025/alpine/fracol01/2025alpinefracol01right.webp";
    }
  });

  // Iterate through the drivers and insert them into the database
  for (const driver of driversData) {
    const firstName = driver.first_name;
    const lastName = driver.last_name;
    const teamName = driver.team_name;
    const driverNumber = driver.driver_number;
    const countryCode = driver.country_code;
    const headShotUrl = driver.headshot_url;
    await db.query(
      `INSERT INTO drivers (first_name, last_name, team_name, driver_number, country_code, headshot_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       `,
      [firstName, lastName, teamName, driverNumber, countryCode, headShotUrl]
    );
  }
}
