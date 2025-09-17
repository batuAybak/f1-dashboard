import db from "#db/client";
import { createUser } from "#db/queries/users";
import { country_codes } from "./data/countryCodes.js";
import { vehicleImages } from "./data/vehicleImages.js";
import { raceCalendar } from "./data/raceCalendar.js";
import { teamLogos } from "./data/teamLogos.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const demoUser = await createUser("demo_user", "demo_password", "Demo", "User");

  // Fetch the drivers from the API
  const drivers = await fetch(
    "https://api.openf1.org/v1/drivers?session_key=9912"
  );
  const driversData = await drivers.json();
  // Push country codes into the driver objects
  driversData.map((driver, index) => {
    driver.country_code = country_codes[index];
    if (driver.first_name === "Franco") {
      //One driver has no img file from the api, so manually pushing it.
      driver.headshot_url =
        "https://media.formula1.com/image/upload/c_fill,g_face,w_150,h_150/q_auto/f_png/v1740000000/common/f1/2025/alpine/fracol01/2025alpinefracol01right.webp";
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

  //Since there are 2 drivers from the same team,
  //we need to get the unique team names and their colours
  const teams = [...new Set(driversData.map((driver) => driver.team_name))];
  const teamColors = [
    ...new Set(driversData.map((driver) => driver.team_colour)),
  ];
  // Iterate through the unique team names and their colours and insert them into the database
  for (let i = 0; i < teams.length; i++) {
    await db.query(
      `INSERT INTO teams (team_name, team_color, vehicle_image, team_logos)
       VALUES ($1, $2, $3, $4)
       `,
      [teams[i], teamColors[i], vehicleImages[i], teamLogos[i]]
    );
  }

  // Insert calendar data into the database
  for (const meeting of raceCalendar) {
    await db.query(
      `INSERT INTO calendar (circuit_short_name, meeting_code, location, country_code, country_name, meeting_name, meeting_official_name, gmt_offset, date_start, year)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       `,
      [
        meeting.circuit_short_name,
        meeting.meeting_code,
        meeting.location,
        meeting.country_code,
        meeting.country_name,
        meeting.meeting_name,
        meeting.meeting_official_name,
        meeting.gmt_offset,
        meeting.date_start,
        meeting.year
      ]
    );
  }
}
