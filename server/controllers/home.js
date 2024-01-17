class Home {
  static async load(request, response, next) {
    if (!request.user) {
      return response.redirect('/auth/login');
    }

    const animes = await request.db.get
      .entries(request.user.id)
      .catch((error) => next(error));
    return response.render('index', { list: Home.groupByStatus(animes) });
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
