/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';

import Card from './Card';

const Note = ({ id, content, completed, onToggle, onDelete }) => {
	const { deleteNote } = useAppContext();

	return (
		<div className={`${completed ? `todo completed` : `todo`}`}>
			<div>
				<button onClick={() => onToggle(id)}>
					{completed ? (
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<circle cx='12' cy='12' r='12' fill='#D375B9' />
							<path
								d='M8 12.3041L10.6959 15L16.6959 9'
								stroke='white'
								strokeWidth='2'
							/>
						</svg>
					) : (
						<svg
							width='25'
							height='24'
							viewBox='0 0 25 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<circle cx='12' cy='12' r='12' fill='none' stroke='#80808a' />
						</svg>
					)}
				</button>
				<p>{content}</p>
			</div>
			<button onClick={() => deleteNote(id)}>
				<svg
					width='19'
					height='19'
					viewBox='0 0 19 19'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M18.9997 0.728582L18.2711 0L9.89263 8.37849L1.51424 9.40386e-05L0.785654 0.728676L9.16405 9.10707L0.785156 17.486L1.51374 18.2145L9.89263 9.83565L18.2716 18.2146L19.0002 17.4861L10.6212 9.10707L18.9997 0.728582Z'
						fill='#494C6B'
					/>
				</svg>
			</button>
		</div>
	);
};

const NoteList = () => {
	const {
		authFetch,
		fetchNotes,
		notes: notesFROMAPI,
		createNote,
	} = useAppContext();

	useEffect(() => {
		fetchNotes();
		// setNotes()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [notes, setNotes] = useState(notesFROMAPI);

	const handleAddNote = async content => {
		try {
			const response = await authFetch.post('/notes', {
				content,
			});

			const newNote = response.data;
			setNotes(prevNotes => [newNote, ...prevNotes]);

			fetchNotes();
		} catch (error) {
			console.error('Error adding todo:', error);
		}
	};

	const handleToggleNote = async id => {
		try {
			await authFetch.patch(`/notes/${id}/toggle`);

			setNotes(prevNotes =>
				prevNotes.map(note => {
					if (note.id === id) {
						return { ...note, completed: !note.completed };
					}
					return note;
				})
			);

			fetchNotes();
		} catch (error) {
			console.error('Error toggling todo:', error);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		const content = e.target.note.value;
		if (content) {
			handleAddNote(content);
			e.target.note.value = '';
		}
	};

	return (
		<>
			<Card className='card'>
				<form onSubmit={handleSubmit} className='note-form'>
					<input type='text' name='note' placeholder='Create a new note' />
					<button type='submit' className='btn'>
						Add Note
					</button>
				</form>
			</Card>
			<Card className='card card-note'>
				{notes.map(note => {
					return (
						<Note
							key={note._id}
							id={note._id}
							content={note.content}
							completed={note.completed}
							onToggle={handleToggleNote}
						/>
					);
				})}

				<div>state</div>
			</Card>
		</>
	);
};

export default NoteList;
