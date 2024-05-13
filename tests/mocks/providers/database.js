import users from './data/users.json';
import anime from './data/anime.json';
import entries from './data/entries.json';

import Entry from '../../mocks/classes/entry.js';

class Database {
  static connect() {
    return Promise.resolve();
  }

  static create = {
    async entry(status, progress, rating, notes, started, finished, userid, animeid) {},
    async anime(anime) {},
    async user(user) {},
  };

  static get = {
    async user(username) {
      return Promise.resolve(users.filter((user) => user.username == username)[0]);
    },

    async entries(userid) {
      return Promise.resolve(entries.filter((entry) => entry.user_id == userid));
    },

    async entry(userid, entryid) {
      return Promise.resolve(
        entries.filter((entry) => entry.user_id == userid && entry.id == entryid)
      );
    },

    async anime(id) {
      return Promise.resolve(anime.filter((anime) => anime.id == id));
    },
  };

  static delete = {
    async entry(userid, entryid) {},
  };
}

export default Database;
