import mongoose from 'mongoose';
import moment from 'moment';
import { StatusCodes } from 'http-status-codes';

import Note from '../models/Note.js';
import checkPermissions from '../utils/checkPermissions.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createNote = async (req, res) => {
	const { content } = req.body;

	if (!content) {
		throw new BadRequestError('Please provide a content');
	}

	req.body.createdBy = req.user.userId;

	const note = await Note.create(req.body);
	res.status(StatusCodes.CREATED).json({ note });
};

const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.find();
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const deleteNote = async (req, res) => {
	const { id: noteId } = req.params;

	const note = await Note.findOne({ _id: noteId });

	if (!note) {
		throw new NotFoundError(`No note with id :${noteId}`);
	}

	checkPermissions(req.user, Note.createdBy);

	await Note.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Note removed' });
};

export { createNote, deleteNote, getAllNotes };
