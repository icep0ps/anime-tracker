import express from 'express';
import Myanimelist from '../../controllers/myanimelist.js';

const router = express.Router();

router.post('/', Myanimelist.search);

router.get('/:id', async (request, response, next) => {
  const anime = await Myanimelist.getAnimeDetails(request.params.id).catch((error) => {
    return next(error);
  });
  return response.json({ data: anime });
});

export default router;
