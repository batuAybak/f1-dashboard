import db from "#db/client";
import { createUser } from "#db/queries/users";
import { vehicleImages } from "./data/vehicleImages.js";
import { raceCalendar } from "./data/raceCalendar.js";
import { teamLogos } from "./data/teamLogos.js";
import { addForumTopic, addPostToTopic } from "./queries/forum.js";
import { drivers } from "./data/drivers.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const demoUser1 = await createUser(
    "baybak",
    process.env.USER_PASSWORD,
    "Batu",
    "Aybak"
  );
  const demoUser2 = await createUser(
    "acarvajal",
    process.env.USER2_PASSWORD,
    "Alvaro",
    "Carvajal"
  );

  // Iterate through the drivers and insert them into the database
  for (const driver of drivers) {
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

  // Since there are 2 drivers from the same team, we need to get the unique team names and their colors
  // Map will automatically overwrite duplicate team names, so we end up with unique team names and their corresponding colors
  const teamAndColorMap = new Map(drivers.map((driver) => [driver.team_name, driver.team_color]));
  const teamNamesAndColorsByName = [...teamAndColorMap].sort((teamA, teamB) => teamA[0].localeCompare(teamB[0]));

  // Iterate through the unique team names and their colours and insert them into the database
  for (let i = 0; i < teamNamesAndColorsByName.length; i++) {
    await db.query(
      `INSERT INTO teams (team_name, team_color, vehicle_image, team_logos)
       VALUES ($1, $2, $3, $4)
       `,
      [teamNamesAndColorsByName[i][0], teamNamesAndColorsByName[i][1], vehicleImages[i], teamLogos[i]]
    );
  }

  // Insert calendar data into the database
  for (const meeting of raceCalendar) {
    await db.query(
      `INSERT INTO calendar (circuit_short_name, meeting_code, location, country_code, country_name, meeting_name, meeting_official_name, gmt_offset, date_start, year, image)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
        meeting.year,
        meeting.image,
      ]
    );
  }

  // Dummy forum data
  const forumTopic1 = await addForumTopic(
    "Lando or Oscar?",
    "Who do you think will perform better this season?",
    demoUser1.id
  );
  const forumPost1 = await addPostToTopic(
    forumTopic1.id,
    "I think Lando will outperform Oscar this season.",
    demoUser2.id
  );
  const forumPost1_2 = await addPostToTopic(
    forumTopic1.id,
    "I disagree, Oscar has shown great potential.",
    demoUser1.id
  );
  const forumPost1_3 = await addPostToTopic(
    forumTopic1.id,
    "Both are talented, but I'm leaning towards Lando.",
    demoUser2.id
  );

  const forumTopic2 = await addForumTopic(
    "Best F1 Driver on the Grid",
    "Who is the best F1 driver currently racing?",
    demoUser2.id
  );
  const forumPost2 = await addPostToTopic(
    forumTopic2.id,
    "In my opinion, Max Verstappen is the best driver on the grid right now.",
    demoUser1.id
  );
  const forumPost2_2 = await addPostToTopic(
    forumTopic2.id,
    "Lewis Hamilton has been consistently performing at a high level.",
    demoUser2.id
  );
  const forumPost2_3 = await addPostToTopic(
    forumTopic2.id,
    "Don't forget about Charles Leclerc, he's been impressive too.",
    demoUser1.id
  );
}
