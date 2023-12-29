import 'dotenv/config';
import mysql from 'mysql2/promise';

class Database {
  static async create(title, status, episodes_watched, rating, notes) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
      });

      const [results] = await connection.execute(
        `INSERT INTO anime VALUES (?,?, ?,?,?);`,
        [title, status, episodes_watched, rating, notes]
      );

      return results;
    } catch (error) {
      return Promise.reject('Error creating anime in database ' + error);
    }
  }

  static async getAnime() {
    try {
      const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
      });

      const [results] = await connection.query('select * from anime order by title asc;');
      return results;
    } catch (error) {
      return Promise.reject('Error getting anime in database: ' + error);
    }
  }
}

export default Database;
