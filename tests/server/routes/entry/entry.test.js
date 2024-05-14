import request from 'supertest';
import App from '../../../../server/app';
import Database from '../../../mocks/providers/database';

const app = App.init(Database);
const user = request.agent(app);

beforeAll(async () => {
  await user.post('/auth/login').send({
    username: 'anime_lover123',
    password: 'examplePassword123',
  });
});

describe('GET /', () => {
  test('should return status 200', () => user.get('/entry').expect(200));

  test('should return all users entries', async () => {
    const response = await user.get('/entry');
    expect(response.body['data']).toHaveLength(6);
  });
});

describe('POST /', () => {
  const entry = {
    id: 1002,
    status: 'Watching',
    progress: 8,
    rating: 6,
    notes: "One of the best anime I've watched!",
    started: '2022-10-01',
    finished: '2024-04-15',
    userid: 1,
  };

  const responseEntry = {
    status: 'Watching',
    rating: 6,
    progress: 8,
    started: '2022-10-01',
    finished: '2024-04-15',
    user_id: 1,
    notes: "One of the best anime I've watched!",
    anime_id: 1002,
  };

  test('should redirect to homepage on success', async () => {
    user.post('/entry').send(entry).expect(200);
  });

  test('should return created entry', async () => {
    const response = await user.post('/entry').send(entry);
    expect(response.body['data']).toMatchObject(responseEntry);
  });

  test('should return deleted entry', async () => {
    const response = await user.delete('/entry').send({ anime_id: 1002, user_id: 1 });
    expect(response.body['message']).toBe('Successfully deleted anime from your entries');
  });

  /**
    1. test if anime does not exist
    2. test for failed delete
*/
});
