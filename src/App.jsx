import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AuthPage from './pages/AuthPage'
import RegistrPage from './pages/RegistrPage'
import { PrivateRoute } from './components/PrivateRoute'
import Profile from './components/profile/Profile'
import CreateArticle from './components/createArticle/CreateArticle'
import ArticlePage from './pages/ArticlePage'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/signin' element={<AuthPage />} />
				<Route path='/signup' element={<RegistrPage />} />
				<Route
					path='/profile/1'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path='/profile/1/create-article'
					element={
						<PrivateRoute>
							<CreateArticle />
						</PrivateRoute>
					}
				/>
				<Route
					path='/acticle/1'
					element={
						<PrivateRoute>
							<ArticlePage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
