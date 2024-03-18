import request from 'supertest';
import App from '../../../../server/app';
import Database from '../../../mocks/providers/database';

const app = App.init(Database);

describe('GET /', () => {
  describe('return users entries', () => {
    test('should return status 200', () => request(app).get('/entry').expect(200));
  });
});
