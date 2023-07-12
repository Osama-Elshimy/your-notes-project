/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';

import Card from './Card';

const Note = ({ id, content, completed, onToggle, onDelete }) => {
	return (
		<div className={`${completed ? `note completed` : `note`}`}>
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
			<button onClick={() => onDelete(id)}>
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
	const { authFetch, fetchNotes, notes } = useAppContext();
	const [filteredNotes, setFilteredNotes] = useState([]);
	const [filter, setFilter] = useState('all');
	const [totalActiveNotes, setTotalActiveNotes] = useState(0);

	useEffect(() => {
		fetchNotes();
	}, []);

	useEffect(() => {
		setFilteredNotes(notes);
	}, [notes]);

	const sortNotes = notes => {
		const completedNotes = notes.filter(note => note.completed);
		const activeNotes = notes.filter(note => !note.completed);

		return [...activeNotes, ...completedNotes];
	};

	const handleToggleNote = async id => {
		try {
			await authFetch.patch(`/notes/${id}/toggle`);

			setFilteredNotes(prevNotes => {
				const updatedNotes = prevNotes.map(note => {
					if (note._id === id) {
						return { ...note, completed: !note.completed };
					}
					return note;
				});

				return sortNotes(updatedNotes);
			});
		} catch (error) {
			console.error('Error toggling todo:', error);
		}
	};

	const handleFilterChange = filter => {
		setFilter(filter);
		switch (filter) {
			case 'all':
				setFilteredNotes(notes);
				break;
			case 'completed':
				setFilteredNotes(notes.filter(note => note.completed));
				break;
			case 'active':
				setFilteredNotes(notes.filter(note => !note.completed));
				break;
			default:
				setFilteredNotes(notes);
				break;
		}
	};

	const clearCompleted = async () => {
		try {
			const completedNoteIds = notes
				.filter(note => note.completed)
				.map(note => note._id);

			await Promise.all(
				completedNoteIds.map(id => authFetch.delete(`/notes/${id}`))
			);

			fetchNotes();
		} catch (error) {
			console.error('Error deleting completed notes:', error);
		}
	};

	const createNote = async content => {
		try {
			const response = await authFetch.post('/notes', { content });
			const { note } = response.data;
			setFilteredNotes(prevNotes => {
				return [note, ...prevNotes];
			});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteNote = async noteId => {
		try {
			await authFetch.delete(`/notes/${noteId}`);
			setFilteredNotes(prevNotes => {
				return prevNotes.filter(note => note._id !== noteId);
			});
		} catch (error) {
			console.error('Error deleting note:', error);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		const content = e.target.note.value;
		if (content) {
			createNote(content);
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
				{filteredNotes.map(note => {
					return (
						<Note
							key={note.id}
							id={note._id}
							content={note.content}
							completed={note.completed}
							onToggle={handleToggleNote}
							onDelete={deleteNote}
						/>
					);
				})}

				<div className='note-actions'>
					<span>{notes.filter(note => !note.completed).length} Items left</span>
					<button
						className={filter === 'all' ? 'active' : ''}
						onClick={() => handleFilterChange('all')}>
						All
					</button>
					<button
						className={filter === 'active' ? 'active' : ''}
						onClick={() => handleFilterChange('active')}>
						Active
					</button>
					<button
						className={filter === 'completed' ? 'active' : ''}
						onClick={() => handleFilterChange('completed')}>
						Completed
					</button>
					<button onClick={clearCompleted}>Clear Completed</button>
				</div>
			</Card>
		</>
	);
};

export default NoteList;
