import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	notes: [],
};

const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		createNote: (state, action) => {
			state.notes.push(action.payload);
		},
		editNote: (state, action) => {
			const { id, title, content } = action.payload;
			const note = state.notes.find(note => note.id === id);
			if (note) {
				note.title = title;
				note.content = content;
			}
		},
		deleteNote: (state, action) => {
			const { id } = action.payload;
			state.notes = state.notes.filter(note => note.id !== id);
		},
		setNoteCompleted: (state, action) => {
			const { id, completed } = action.payload;
			const note = state.notes.find(note => note.id === id);
			if (note) {
				note.completed = completed;
			}
		},
		deleteCompletedNotes: state => {
			state.notes = state.notes.filter(note => !note.completed);
		},
	},
});

export const {
	createNote,
	editNote,
	deleteNote,
	setNoteCompleted,
	deleteCompletedNotes,
} = noteSlice.actions;

export default noteSlice.reducer;
