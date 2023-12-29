import Database from '../providers/database.js';

class Anime {
  static async create(request, response) {
    try {
      const { title, status, episodes_watched, rating, notes } = request.body;
      await Database.create(title, status, episodes_watched, rating, notes);
      response.redirect('/');
    } catch (error) {
      response.stautsCode = 500;
      response.json({ msg: 'Error creating anime ' + error });
    }
  }

  static async get(request, response) {
    try {
      const anime = await Database.getAnime();
      response.json({ data: anime });
    } catch (error) {
      response.stautsCode = 500;
      response.json({ msg: 'Error getting anime ' + error });
    }
  }
}

export default Anime;
