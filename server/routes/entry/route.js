import express from 'express';
import Entry from '../../controllers/entry.js';
const router = express.Router();

router.get('/', Entry.get.entries);
router.get('/:id', Entry.get.entry);

router.post('/', Entry.create);
router.delete('/', Entry.delete);

export default router;
