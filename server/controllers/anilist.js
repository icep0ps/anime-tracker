import axios from 'axios';
import Locals from '../providers/locals.js';

class Anilist {
  static async search(request, response) {
    try {
      const { data } = await axios('https://api.myanimelist.net/v2/anime', {
        headers: {
          'X-MAL-CLIENT-ID': Locals.config().apiClientId,
        },
        params: {
          limit: 10,
          q: request.body.search,
        },
      });
      console.log(data.data);
      response.render('search', { results: data.data });
    } catch (err) {
      console.log(err);
    }
  }
}
export default Anilist;
