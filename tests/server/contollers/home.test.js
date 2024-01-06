import Entry from '../../mocks/classes/entry.js';
import Home from '../../../server/controllers/home.js';

describe('Methods are producing desired outputs', () => {
  describe('groupByStauts', () => {
    const entries = [
      new Entry(1, 1, 'watching'),
      new Entry(1, 2, 'dropped'),
      new Entry(1, 3, 'watching'),
      new Entry(1, 4, 'paused'),
    ];

    const group = Home.groupByStatus(entries);

    test('watching returns 2 entries', () => {
      expect(group.get('watching')).toEqual([
        new Entry(1, 1, 'watching'),
        new Entry(1, 3, 'watching'),
      ]);
    });

    test('dropped returns 1 entry', () => {
      expect(group.get('dropped')).toEqual([new Entry(1, 2, 'dropped')]);
    });

    test('paused returns 1 entry', () => {
      expect(group.get('paused')).toEqual([new Entry(1, 4, 'paused')]);
    });

    test('planning returns empty array', () => {
      expect(group.get('planning')).toEqual([]);
    });
  });
});
