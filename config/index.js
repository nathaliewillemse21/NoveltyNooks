import { createPool } from 'mysql';
import { config } from 'dotenv';

config();
let connection = createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_Name,
  user: process.env.DB_UserName,
  password: process.env.DB_UserPass,
  multipleStatements: true,
  connectionLimit: 10,
});
export { connection };