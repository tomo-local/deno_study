import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";

const users = ["a", "b", "c"];
const db = new DB("sqlite.db");

db.query(
  "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT)",
);
for (const user of users) db.query("INSERT INTO users(user) VALUES(?)", [user]);
for (const user of db.query("SELECT * FROM users")) console.log(user);
db.close();
