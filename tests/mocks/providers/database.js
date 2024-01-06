import Entry from '../../mocks/classes/entry.js';

class Database {
  static create = {
    async entry(status, progress, rating, notes, started, finished, userid, animeid) {},
    async anime(anime) {},

    async user(user) {},
  };

  static get = {
    async user(username, password) {},

    async entries(userid) {
      return [
        new Entry(userid, 1, 'watching'),
        new Entry(userid, 2, 'dropped'),
        new Entry(userid, 3, 'watching'),
        new Entry(userid, 4, 'paused'),
      ];
    },

    async entry(userid, entryid) {},

    async anime(id) {},
  };

  static delete = {
    async entry(userid, entryid) {},
  };
}

export default Database;
