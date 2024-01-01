import Fetcher from '../utlis/fetcher.js';
import Locals from '../providers/locals.js';
import Anime from '../controllers/anime.js';

class Myanimelist {
  static async search(request, response) {
    const results = await Fetcher.fetch('https://api.myanimelist.net/v2/anime', {
      headers: {
        'X-MAL-CLIENT-ID': Locals.config().apiClientId,
      },
      params: {
        q: request.body.search,
        limit: 10,
      },
    });
    response.render('search', { results: results.data });
  }

  static async getAnimeDetails(id) {
    return await Fetcher.fetch('https://api.myanimelist.net/v2/anime/' + id, {
      headers: {
        'X-MAL-CLIENT-ID': Locals.config().apiClientId,
      },
      params: {
        fields: Anime.fields,
      },
    });
  }
}
export default Myanimelist;