import React, { useState } from 'react'
import styles from '../auth/AuthForm.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Registr = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [role, setRole] = useState('user')
	const navigate = useNavigate()

	const handleAuth = async e => {
		e.preventDefault()
		setError('')

		if (!username.trim() || !password.trim()) {
			setError('Заполните все поля')
			return
		}

		if (password.length < 6) {
			setError('Пароль должен быть больше 6 символов')
		}

		setIsLoading(true)
		const url = `http://45.155.204.6:5082/signup`
		try {
			const response = await axios.post(
				url,
				{
					username,
					password,
					role,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)

			console.log('Успешная регистрация', response.data, role)
			localStorage.setItem('userId', response.data.id)
			navigate('/signin')
		} catch (error) {
			console.error('Ошибка ', error)
			setError(error.response?.data?.message || 'Произошла ошибка')
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className={styles.mainContainer}>
			<p className={styles.authText}>Регистрация</p>

			{error && <div className={styles.error}>{error}</div>}

			<form onSubmit={handleAuth} className={styles.form}>
				<div className={styles.inputs}>
					<div className={styles.inputSpan}>
						<span>Логин</span>
						<input
							type='text'
							name='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className={styles.inputSpan}>
						<span>Пароль</span>
						<input
							type='password'
							name='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							minLength='6'
						/>
					</div>
				</div>
				<div className={styles.btnLink}>
					<div className={styles.signinButton}>
						<button type='submit' disabled={isLoading}>
							{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
						</button>
					</div>
					<p className={styles.makeAcc}>
						Есть аккаунт
						<span>
							<a href='/signin'> войти</a>
						</span>
					</p>
				</div>
			</form>
		</div>
	)
}

export default Registr
