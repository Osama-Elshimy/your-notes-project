import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './assets/style/style.scss';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';

const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
