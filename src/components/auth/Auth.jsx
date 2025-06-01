import React, { useState } from 'react'
import axios from 'axios'
import styles from './AuthForm.module.css'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const handleAuth = async e => {
		e.preventDefault()
		setError('')

		if (!username.trim() && !password.trim()) {
			setError('Заполните все поля')
			return
		}

		setIsLoading(true)

		const url = `http://45.155.204.6:5082/signin`

		try {
			const response = await axios.post(
				url,
				{
					username,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			console.log('Успешный вход', response.data)

			localStorage.setItem('token', response.data.token)
			localStorage.setItem('user', JSON.stringify(response.data.user))

			navigate('/')
		} catch (error) {
			console.error('Ошибка ', error)
			setError(error.response?.data?.message || 'Неверный логин или пароль')
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className={styles.mainContainer}>
			<h3 className={styles.authText}>Авторизация</h3>

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
							required
						/>
					</div>
				</div>
				<div className={styles.btnLink}>
					<div className={styles.signinButton}>
						<button type='submit' disabled={isLoading}>
							{isLoading ? 'Загрузка...' : 'Войти'}
						</button>
					</div>
					<p className={styles.makeAcc}>
						Нет аккаунта?
						<span>
							<a href='/signup'> Зарегистрироваться!</a>
						</span>
					</p>
				</div>
			</form>
		</div>
	)
}

export default Auth
