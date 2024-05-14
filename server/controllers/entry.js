import Myanimelist from './myanimelist.js';

class Entry {
  static fields =
    'id,title,main_picture,alternative_titles,synopsis,genres,num_episodes,rating,pictures,background,statistics';

  static async create(request, response, next) {
    const { id, status, progress, rating, notes, started, finished } = request.body;

    try {
      const animeExists = await request.db.get.anime(id);

      if (animeExists.length === 0) {
        const anime = await Myanimelist.getAnimeDetails(id);
        await request.db.create.anime(anime);
      }

      await request.db.create.entry({
        status,
        progress,
        rating,
        notes,
        started: started !== '' ? started : null,
        finished: finished !== '' ? finished : null,
        user_id: request.user.id,
        anime_id: id,
      });

      return response.redirect('/');
    } catch (error) {
      return next(error);
    }
  }

  static get = {
    async entries(request, response, next) {
      try {
        const entries = await request.db.get.entries(request.user.id);
        return response.json({ data: entries });
      } catch (error) {
        return next(error.message);
      }
    },

    async entry(request, response, next) {
      const entry_id = request.params.id;
      try {
        const entry = await request.db.get.entry(request.user.id, entry_id);
        return response.json(entry ? entry : null);
      } catch (error) {
        return next(error.message);
      }
    },
  };

  static async update(request, response, next) {
    const entry = request.body;
    try {
      await request.db.update.entry(request.user.id, entry);
      return response.redirect('back');
    } catch (error) {
      return next(error.message);
    }
  }

  static async delete(request, response, next) {
    const user_id = request.user.id;
    const anime_id = request.params.id;
    try {
      await request.db.delete.entry(user_id, anime_id);
      return response.status(200).send('Entry deleted');
    } catch (error) {
      return next(error.message);
    }
  }
}

export default Entry;
