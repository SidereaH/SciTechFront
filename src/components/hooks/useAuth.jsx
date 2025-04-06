import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		setIsAuthenticated(!!token)
	}, [])

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('User')
		setIsAuthenticated(false)
		navigate('/signin')
	}

	return { isAuthenticated, logout }
}

export default useAuth
