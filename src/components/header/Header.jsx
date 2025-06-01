import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/img/logo.png'
import useAuth from '../hooks/useAuth'

const Header = () => {
	const { isAuthenticated, logout } = useAuth()
	return (
		<header>
			<div className={styles.headMain}>
				<div className={styles.leftSide}>
					<div className={styles.logo}>
						<img src={logo} alt='' />
					</div>

					<div className={styles.links}>
						<a href='/'>Новости</a>
						<a href=''>Статьи</a>
						<a href='/profile/1/create-article'>Создать</a>
					</div>
				</div>

				{isAuthenticated ? (
					<div className={styles.profileOut}>
						<a className={styles.login} href={`/profile/1`}>
							<span>Личный кабинет</span>
						</a>
						<button onClick={logout}>Выйти</button>
					</div>
				) : (
					<div className={styles.profileOut}>
						<a className={styles.login} href='/signin'>
							Войти
						</a>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
