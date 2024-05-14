import request from 'supertest';
import App from '../../../../server/app';
import Database from '../../../mocks/providers/database';

const app = App.init(Database);
const user = request.agent(app);

describe('POST /login', () => {
  test('should redicrect to homepage on success', async () => {
    const response = await user.post('/auth/login').send({
      username: 'anime_lover123',
      password: 'examplePassword123',
    });
    expect(response.headers['location']).toBe('/');
  });

  test('should redicrect to login page on fail ', async () => {
    const response = await user.post('/auth/login').send({
      username: 'anime_lover123',
      password: 'examplePassword1234123',
    });
    expect(response.headers['location']).toBe('/auth/login');
  });

  //TODO: test the login failed error messages
});
