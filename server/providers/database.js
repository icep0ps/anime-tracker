import 'dotenv/config';
import mysql from 'mysql2/promise';
import Anime from '../controllers/entry.js';

class Database {
  static async connect() {
    return mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
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
        .query(
          'SELECT entry.user_id, anime.main_picture,anime.id , anime.title, entry.rating, progress, entry.status, anime.num_episodes FROM `entry` INNER JOIN `anime` ON entry.anime_id=anime.id;',
          [userid]
        )
        .catch((error) => {
          throw new Error('Error getting anime list from database ' + error);
        });
      return results;
    },

    async entry(userid, entryid) {
      const connection = await Database.connect();
      const [results] = await connection
        .query(
          'SELECT entry.user_id, anime.main_picture,anime.id , anime.title, entry.rating, progress, entry.status, anime.num_episodes, entry.notes, entry.started, entry.finished FROM `entry` INNER JOIN `anime` ON entry.anime_id=anime.id WHERE entry.user_id = ? AND entry.anime_id = ?;',
          [userid, entryid]
        )
        .catch((error) => {
          throw new Error('Error getting entry from database ' + error);
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

  static delete = {
    async entry(userid, entryid) {
      const connection = await Database.connect().catch((error) => {
        throw new Error('Error connection to database ' + error);
      });

      const [results] = await connection
        .execute('DELETE FROM `entry` WHERE user_id= ? AND anime_id= ?;', [
          userid,
          entryid,
        ])
        .catch((error) => {
          throw new Error('Error creating user in database ' + error);
        });

      return results;
    },
  };
}

export default Database;
