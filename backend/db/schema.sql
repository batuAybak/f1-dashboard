DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS favorite_drivers;
DROP TABLE IF EXISTS favorite_teams;
DROP TABLE IF EXISTS calendar;
DROP TABLE IF EXISTS forum_topics CASCADE;
DROP TABLE IF EXISTS forum_posts;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL
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
  team_color text NOT NULL,
  vehicle_image text NOT NULL,
  team_logos text NOT NULL
);

CREATE TABLE favorite_drivers (
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  driver_id integer REFERENCES drivers(driver_number) ON DELETE CASCADE,
  PRIMARY KEY (user_id, driver_id)
);

CREATE TABLE favorite_teams (
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  team_id integer REFERENCES teams(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, team_id)
);

CREATE TABLE calendar(
  meeting_key serial PRIMARY KEY,
  circuit_short_name text NOT NULL,
  meeting_code text NOT NULL,
  location text NOT NULL,
  country_code text NOT NULL,
  country_name text NOT NULL,
  meeting_name text NOT NULL,
  meeting_official_name text NOT NULL,
  gmt_offset interval NOT NULL,
  date_start timestamp with time zone NOT NULL,
  year integer NOT NULL,
  image text NOT NULL
);

-- Set starting value for meeting_key serial to 1254
ALTER SEQUENCE calendar_meeting_key_seq RESTART WITH 1254;


CREATE TABLE forum_topics(
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forum_posts(
  id serial PRIMARY KEY,
  topic_id integer NOT NULL REFERENCES forum_topics(id) ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);
