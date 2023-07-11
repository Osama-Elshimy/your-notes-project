import { useEffect } from 'react';
import { useAppContext } from './context/appContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, ModifyUser, Register, Error, ProtectedRoute } from './pages';

import { BackgroundDiv } from './components';

const App = () => {
	const { isDarkMode } = useAppContext();

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

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
