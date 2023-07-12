import { useState, useEffect } from 'react';
import { useAppContext } from './context/appContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, ModifyUser, Register, Error, ProtectedRoute } from './pages';

import { BackgroundDiv } from './components';

import { useTranslation } from 'react-i18next';

const App = () => {
	const { i18n } = useTranslation();
	const { isDarkMode } = useAppContext();
	const [language, setLanguage] = useState(
		localStorage.getItem('language') || 'en'
	);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// const html = document.documentElement;
		// html.lang = language;
		// html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
	}, [isDarkMode, language]);

	return (
		<BrowserRouter>
			<BackgroundDiv />
			<Routes>
				<Route
					path='/'
					element={<ProtectedRoute>{<Home />}</ProtectedRoute>}></Route>
				<Route path='/register' element={<Register />} />
				<Route
					path='/modifyuser'
					element={
						<ProtectedRoute>
							<ModifyUser />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
