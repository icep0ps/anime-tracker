import axios from 'axios';
import Locals from '../providers/locals.js';
import Database from '../providers/database.js';

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
        response.redirect('/');
      } else {
        const anime = await Anime.getAnimeDetails(id);
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
    } catch (error) {
      next(error);
    }
  }

  static async getAnimeDetails(id) {
    const { data } = await axios
      .get('https://api.myanimelist.net/v2/anime/' + id, {
        headers: {
          'X-MAL-CLIENT-ID': Locals.config().apiClientId,
        },
        params: {
          fields: Anime.fields,
        },
      })
      .catch((error) => {
        throw new Error('Failed to get anime data: ', error);
      });

    return data;
  }

  static async get(request, response, next) {
    response.json({ data: Database.get.entries(1) }).catch((error) => next(error));
  }
}

export default Anime;
