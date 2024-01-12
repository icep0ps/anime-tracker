import Myanimelist from './myanimelist.js';

class Entry {
  static fields =
    'id,title,main_picture,alternative_titles,synopsis,genres,num_episodes,rating,pictures,background,statistics';

  static async create(request, response, next) {
    try {
      const { id, status, progress, rating, notes, started, finished } = request.body;
      const animeExists = await request.db.get.anime(id);

      if (animeExists.length) {
        await request.db.create.entry(
          status,
          progress,
          rating,
          notes,
          started,
          finished,
          request.user.id,
          id
        );
      } else {
        const anime = await Myanimelist.getAnimeDetails(id);
        await request.db.create.anime(anime);
        await request.db.create.entry(
          status,
          progress,
          rating,
          notes,
          started,
          finished,
          request.user.id,
          id
        );
      }

      return response.redirect('/');
    } catch (error) {
      next(error);
    }
  }

  static get = {
    async entries(request, response, next) {
      const entries = await request.db.get
        .entries(request.user.id)
        .catch((error) => next(error));
      response.json({ data: entries });
    },

    async entry(request, response, next) {
      const entry_id = request.params.id;
      const entry = await request.db.get
        .entry(request.user.id, entry_id)
        .catch((error) => next(error));
      response.json({ data: entry });
    },
  };

  static async update(request, response, next) {
    const entry = request.body;
    await request.db.update.entry(request.user.id, entry).catch((error) => next(error));
    response.redirect('back');
  }

  static async delete(request, response, next) {
    const { anime_id, user_id } = request.body;
    await request.db.delete
      .entry(user_id, anime_id)
      .then(() => {
        return response.json({ msg: 'deleted anime from your entries' });
      })
      .catch((error) => next(error));
  }
}

export default Entry;
