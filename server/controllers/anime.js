import Database from '../providers/database.js';
import Myanimelist from './myanimelist.js';

class Anime {
  static fields =
    'id,title,main_picture,alternative_titles,synopsis,genres,num_episodes,rating,pictures,background,statistics';

  static async create(request, response, next) {
    try {
      const { id, status, progress, rating, notes, started, finished } = request.body;
      const animeExists = await Database.get.anime(id);

      if (animeExists.length) {
        await Database.create.entry(
          status,
          progress,
          rating,
          notes,
          started,
          finished,
          1,
          id
        );
      } else {
        const anime = await Myanimelist.getAnimeDetails(id);
        await Database.create.anime(anime);
        await Database.create.entry(
          status,
          progress,
          rating,
          notes,
          started,
          finished,
          1,
          id
        );
      }

      return response.redirect('/');
    } catch (error) {
      next(error);
    }
  }

  static async get(request, response, next) {
    response.json({ data: Database.get.entries(1) }).catch((error) => next(error));
  }
}

export default Anime;
