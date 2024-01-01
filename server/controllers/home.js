import Database from '../providers/database.js';

class Home {
  static async load(request, response, next) {
    const animes = await Database.get.entries(1).catch((error) => next(error));
    response.render('index', { list: Home.groupByStatus(animes) });
  }

  static groupByStatus(animes) {
    const group = new Map();
    const status = ['watching', 'planning', 'completed', 'paused', 'dropped'];

    status.forEach((status) => {
      group.set(
        status,
        animes.filter((anime) => anime.status === status)
      );
    });
    return group;
  }
}

export default Home;
