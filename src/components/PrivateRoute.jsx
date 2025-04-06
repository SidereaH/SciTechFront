import { Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'

export const PrivateRoute = ({ children }) => {
	const token = localStorage.getItem('token')
	return token ? children : <Navigate to='/signin' />
}

export default PrivateRoute
