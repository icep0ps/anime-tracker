import axios from 'axios';

class Fetcher {
  static async fetch(link, options) {
    const { data } = await axios.get(link, options).catch((error) => {
      throw new Error('Failed to get data: ', error);
    });

    return data;
  }
}

export default Fetcher;
