DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS user_favorites;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE drivers (
  driver_number integer NOT NULL PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  country_code text,
  team_name text NOT NULL,
  headshot_url text
);

CREATE TABLE teams(
  id serial PRIMARY KEY,
  team_name text NOT NULL UNIQUE,
  team_color text NOT NULL
);

CREATE TABLE user_favorites (
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  driver_id integer REFERENCES drivers(driver_number) ON DELETE CASCADE,
  team_id integer REFERENCES teams(id) ON DELETE CASCADE,
  CONSTRAINT unique_user_driver UNIQUE(user_id, driver_id),
  CONSTRAINT unique_user_team UNIQUE(user_id, team_id),
  -- Optionally, enforce only one favorite per row:
  CONSTRAINT only_one_favorite CHECK (
    (driver_id IS NOT NULL AND team_id IS NULL) OR
    (driver_id IS NULL AND team_id IS NOT NULL)
  )
);