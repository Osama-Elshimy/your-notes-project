import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import noteReducer from './note';

const rootReducer = combineReducers({
	user: userReducer,
	note: noteReducer,
});

export default rootReducer;
