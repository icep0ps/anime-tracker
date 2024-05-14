import 'dotenv/config';
import postgres from 'postgres';
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
    async entry(entry) {
      try {
        const sql = Database.connect();
        const res = await sql`INSERT INTO entry ${sql(
          entry,
          'status',
          'rating',
          'progress',
          'started',
          'finished',
          'user_id',
          'notes',
          'anime_id'
        )} RETURNING *;`;
        return res;
      } catch (error) {
        throw new Error('Error creating entry in database ' + error);
      }
    },

    async anime(anime) {
      try {
        const sql = Database.connect();
        const results = await sql`INSERT INTO anime ${sql(
          anime,
          'id',
          'title',
          'main_picture',
          'alternative_titles',
          'synopsis',
          'genres',
          'num_episodes',
          'rating',
          'pictures',
          'background',
          'statistics'
        )} RETURNING *;`;

        return results;
      } catch (error) {
        throw new Error('Error creating anime in database: ' + error);
      }
    },

    async user(user) {
      try {
        const sql = Database.connect();
        const res = await sql`INSERT INTO user ${sql(
          user,
          'username',
          'password',
          'email'
        )} RETURNING *`;

        return res;
      } catch (error) {
        throw new Error('Error creating user in database ' + error);
      }
    },
  };

  static get = {
    async user(username) {
      try {
        const sql = Database.connect();
        const res = await sql`SELECT * FROM "User" WHERE username = ${username};`;
        return res[0];
      } catch (error) {
        throw new Error('Error getting user in database: ' + error);
      }
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
      return res;
    },

    async entry(userid, entryid) {
      try {
        const sql = Database.connect();
        const results =
          await sql`SELECT entry.user_id, anime.main_picture,anime.id , anime.title, entry.rating, progress, entry.status, anime.num_episodes, entry.notes, entry.started, entry.finished FROM entry INNER JOIN anime ON entry.anime_id=anime.id WHERE entry.user_id = ${userid} AND entry.anime_id = ${entryid};`;
        return results[0];
      } catch (error) {
        throw new Error('Error getting entry from database ' + error);
      }
    },

    async anime(id) {
      try {
        const sql = Database.connect();
        const results = await sql`SELECT * FROM anime WHERE id = ${id} ORDER BY title`;

        return results;
      } catch (error) {
        throw new Error('Error getting anime from database ' + error);
      }
    },
  };

  static update = {
    async entry(userid, entry) {
      const { id, rating, progress, status, notes, started, finished } = entry;
      try {
        const sql = Database.connect();
        const results =
          await sql`UPDATE entry status SET status = ${status} ,rating = ${rating} ,progress= ${progress} ,started = ${
            started !== '' ? started : null
          } ,finished = ${
            finished !== '' ? finished : null
          }, notes = ${notes} WHERE user_id = ${userid} AND anime_id = ${id} RETURNING *;`;

        return results;
      } catch (error) {
        throw new Error('Error updating entry in database ' + error);
      }
    },
  };

  static delete = {
    async entry(userid, entryid) {
      try {
        const sql = Database.connect();
        const results =
          await sql`DELETE FROM entry WHERE user_id= ${userid} AND anime_id= ${entryid} RETURNING * ;`;
        return results;
      } catch (error) {
        throw new Error('Error creating user in database ' + error);
      }
    },
  };
}

export default Database;
