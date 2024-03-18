import Fetcher from '../utlis/fetcher.js';
import Locals from '../providers/locals.js';
import Anime from './entry.js';

class Myanimelist {
  static async search(request, response, next) {
    const results = await Fetcher.fetch('https://api.myanimelist.net/v2/anime', {
      headers: {
        'X-MAL-CLIENT-ID': Locals.config().apiClientId,
      },
      params: {
        q: request.body.search,
        limit: 10,
      },
    }).catch((error) => {
      return next(error);
    });
    return response.render('search', { results: results.data });
  }

  static async getAnimeDetails(id) {
    const data = await Fetcher.fetch('https://api.myanimelist.net/v2/anime/' + id, {
      headers: {
        'X-MAL-CLIENT-ID': Locals.config().apiClientId,
      },
      params: {
        fields: Anime.fields,
      },
    });

    return data;
  }
}
export default Myanimelist;
