import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/img/logo.png'

const Header = () => {
	return (
		<header>
			<div className={styles.headMain}>
				<div className={styles.leftSide}>
					<div className={styles.logo}>
						<img src={logo} alt='' />
					</div>

					<div className={styles.links}>
						<a href=''>Новости</a>
						<a href=''>Статьи</a>
					</div>
				</div>

				<a className={styles.login} href=''>
					Войти
				</a>
			</div>
		</header>
	)
}

export default Header
