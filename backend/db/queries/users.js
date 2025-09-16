import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password, firstName, lastName) {
  const sql = `
  INSERT INTO users
    (username, password, first_name, last_name)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function getUserFullName(firstName, lastName) {
  const SQL = `
  SELECT *
  FROM users
  WHERE first_name = $1 AND last_name = $2
  `;
  const {
    rows: [user],
  } = await db.query(SQL, [firstName, lastName]);
  return user;
}
