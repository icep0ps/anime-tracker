import 'dotenv/config';
import postgres from 'postgres';
import Anime from '../controllers/entry.js';
import Locals from './locals.js';

class Database {
  static connect() {
    const { port, host, database, user, password } = Locals.config();
    return postgres({
      host,
      user,
      database,
      port,
      password,
    });
  }

  static create = {
    async entry(status, progress, rating, notes, started, finished, userid, animeid) {
      const sql = await Database.connect();
      const res = await sql`INSERT INTO entry ${sql([
        status,
        rating,
        progress,
        started,
        finished ? finished : null,
        userid,
        notes,
        animeid,
      ])}(status, rating, progress, started, finished, user_id, notes, anime_id)`.catch(
        (error) => {
          throw new Error('Error creating entry in database ' + error);
        }
      );

      return res;
    },

    async anime(anime) {
      const sql = await Database.connect();
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
      const sql = await Database.connect().catch((error) => {
        throw new Error('Error connection to database ' + error);
      });
      const res = await sql`INSERT INTO user ${sql(
        user,
        'username',
        'password',
        'email'
      )}`.catch((error) => {
        throw new Error('Error creating user in database ' + error);
      });
      return res;
    },
  };

  static get = {
    async user(username) {
      const sql = Database.connect();
      const res = await sql`SELECT * FROM "User" WHERE username = ${username};`.catch(
        (error) => {
          throw new Error('Error getting user in database: ' + error);
        }
      );
      return res[0];
    },

    async entries(userid) {
      const sql = Database.connect();
      const res =
        await sql`SELECT entry.user_id, anime.main_picture,anime.id , anime.title, entry.rating, progress, entry.status, anime.num_episodes FROM entry INNER JOIN anime ON entry.anime_id=anime.id WHERE entry.user_id=${userid};`.catch(
          (error) => {
            throw new Error('Error getting anime list from database ' + error);
          }
        );
      if (res.count === 0) return [];
      return res[0];
    },

    async entry(userid, entryid) {
      const sql = await Database.connect();
      const [results] = await connection
        .query(
          'SELECT entry.user_id, anime.main_picture,anime.id , anime.title, entry.rating, progress, entry.status, anime.num_episodes, entry.notes, entry.started, entry.finished FROM `entry` INNER JOIN `anime` ON entry.anime_id=anime.id WHERE entry.user_id = ? AND entry.anime_id = ?;',
          [userid, entryid]
        )
        .catch((error) => {
          throw new Error('Error getting entry from database ' + error);
        });
      return results[0];
    },

    async anime(id) {
      const sql = await Database.connect();
      const [results] = await connection
        .query('SELECT * FROM `anime` WHERE `id` = ? ORDER BY `title`', [id])
        .catch((error) => {
          throw new Error('Error getting anime from database ' + error);
        });
      return results;
    },
  };

  static update = {
    async entry(userid, entry) {
      const { id, rating, progress, status, notes, started, finished } = entry;

      const sql = await Database.connect().catch((error) => {
        throw new Error('Error connection to database ' + error);
      });

      const [results] = await connection
        .execute(
          'UPDATE `entry` status SET status = ? ,rating = ? ,progress= ? ,started = ? ,finished = ?, notes = ? WHERE user_id = ? AND anime_id = ?;',
          [
            status,
            rating,
            progress,
            started !== '' ? started : null,
            finished !== '' ? finished : null,
            notes,
            userid,
            id,
          ]
        )
        .catch((error) => {
          throw new Error('Error updating entry in database ' + error);
        });

      return results;
    },
  };

  static delete = {
    async entry(userid, entryid) {
      const sql = await Database.connect().catch((error) => {
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
