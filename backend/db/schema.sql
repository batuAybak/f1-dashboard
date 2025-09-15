DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS favorite_drivers;

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

CREATE TABLE favorite_drivers (
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  driver_id integer REFERENCES drivers(driver_number) ON DELETE CASCADE,
  PRIMARY KEY (user_id, driver_id)
);