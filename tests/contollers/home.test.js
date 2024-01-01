import Home from '../../server/controllers/home.js';

const MockAnime = (id, status) => {
  return {
    id,
    status,
  };
};

describe('Methods are producing desired outputs', () => {
  describe('groupByStauts', () => {
    const animes = [
      MockAnime(1, 'watching'),
      MockAnime(2, 'dropped'),
      MockAnime(3, 'watching'),
      MockAnime(4, 'paused'),
    ];

    const group = Home.groupByStatus(animes);

    test('watching returns 2 animes', () => {
      expect(group.get('watching')).toEqual([
        MockAnime(1, 'watching'),
        MockAnime(3, 'watching'),
      ]);
    });

    test('dropped returns 1 anime', () => {
      expect(group.get('dropped')).toEqual([MockAnime(2, 'dropped')]);
    });

    test('paused returns 1 anime', () => {
      expect(group.get('paused')).toEqual([MockAnime(4, 'paused')]);
    });

    test('planning returns empty array', () => {
      expect(group.get('planning')).toEqual([]);
    });
  });
});
