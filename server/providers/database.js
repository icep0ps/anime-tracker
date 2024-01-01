import 'dotenv/config';
import mysql from 'mysql2/promise';
import Anime from '../controllers/anime.js';

class Database {
  static async connect() {
    return await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
    });
  }

  static create = {
    async entry(status, progress, rating, notes, started, finished, userid, animeid) {
      const connection = await Database.connect();
      const [results] = await connection
        .execute('INSERT INTO `entry` VALUES (?,?,?,?,?,?,?,?);', [
          status,
          rating,
          progress,
          started,
          finished ? finished : null,
          notes,
          userid,
          animeid,
        ])
        .catch((error) => {
          throw new Error('Error creating entry in database ' + error);
        });

      return results;
    },
    async anime(anime) {
      const connection = await Database.connect();
      const {
        id,
        title,
        main_picture,
        alternative_titles,
        synopsis,
        genres,
        num_episodes,
        rating,
        pictures,
        background,
        statistics,
      } = anime;

      const [results] = await connection
        .execute(`INSERT INTO anime (${Anime.fields}) VALUES  (?,?,?,?,?,?,?,?,?,?,?);`, [
          id,
          title,
          main_picture,
          alternative_titles,
          synopsis,
          genres,
          num_episodes,
          rating,
          pictures,
          background,
          statistics,
        ])
        .catch((error) => {
          throw new Error('Error creating anime in database ' + error);
        });

      return results;
    },

    async user(user) {
      const { username, email, password } = user;
      const connection = await Database.connect().catch((error) => {
        throw new Error('Error connection to database ' + error);
      });

      const [results] = await connection
        .execute('INSERT INTO `user` (username, password, email) VALUES (?,?,?);', [
          username,
          password,
          email,
        ])
        .catch((error) => {
          throw new Error('Error creating user in database ' + error);
        });

      return results;
    },
  };

  static get = {
    async user(username, password) {
      const connection = await Database.connect();
      const [results] = await connection
        .query('SELECT * FROM `user` WHERE `username` = ? AND `password` = ?;', [
          username,
          password,
        ])
        .catch((error) => {
          throw new Error('Error getting anime in database: ' + error);
        });
      return results;
    },

    async entries(userid) {
      const connection = await Database.connect();
      const [results] = await connection
        .query('SELECT * FROM `entry` WHERE `user_id` = ? ORDER BY `title` ASC;', [
          userid,
        ])
        .catch((error) => {
          throw new Error('Error getting anime list from database ' + error);
        });
      return results;
    },

    async anime(id) {
      const connection = await Database.connect();
      const [results] = await connection
        .query('SELECT * FROM `anime` WHERE `id` = ? ORDER BY `title`', [id])
        .catch((error) => {
          throw new Error('Error getting anime from database ' + error);
        });
      return results;
    },
  };
}

export default Database;
