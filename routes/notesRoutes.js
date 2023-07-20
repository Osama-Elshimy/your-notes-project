import express from 'express';
const router = express.Router();

import {
	createNote,
	deleteNote,
	getAllNotes,
	toggleNoteCompletion,
	updateNote,
} from '../controllers/notesController.js';

router.route('/').post(createNote).get(getAllNotes);
router.route('/:id').delete(deleteNote);
router.route('/:id/toggle').patch(toggleNoteCompletion);
router.route('/:id/update').patch(updateNote);

export default router;
