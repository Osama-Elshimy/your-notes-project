import express from 'express';
const router = express.Router();

import {
	createNote,
	deleteNote,
	getAllNotes,
} from '../controllers/notesController.js';

import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createNote).get(getAllNotes);
router.route('/:id').delete(testUser, deleteNote);

export default router;
