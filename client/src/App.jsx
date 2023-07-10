import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, ModifyUser, Register, Error, ProtectedRoute } from './pages';

const App = () => {
	return (
		<BrowserRouter>
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
