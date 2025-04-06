import React, { useState } from 'react'
import styles from './Profile.module.css'
import useAuth from '../hooks/useAuth'
import Header from '../header/Header'
import RightSide from '../mainRightSide/RightSide'
import editProfile from '../../assets/img/editProfile.png'
import avaProfile from '../../assets/img/avaProfile.png'
import NewsImage from '../news/NewsImage'
import usernameLogo from '../../assets/img/usernameLogo.png'
import catNews from '../../assets/img/catNews.png'

const Profile = () => {
	const { logout } = useAuth()
	const user = JSON.parse(localStorage.getItem('User'))
	const [activeButtonId, setActiveButtonId] = useState(2)

	const buttons = [
		{ id: 1, href: '/profile/1/create-article', text: 'Создать' },
		{ id: 2, href: '/profile/1', text: 'Опубликованные' },
		{ id: 3, href: '/profile/1', text: 'Черновик' },
		{ id: 4, href: '/profile/1', text: 'Архив' },
		{ id: 5, href: '/profile/1', text: 'Удаленные' },
	]

	const handleButtonClick = buttonId => {
		setActiveButtonId(buttonId)
	}

	return (
		<div>
			<Header />
			<div className={styles.mainContent}>
				<div className={styles.articlsProfile}>
					<div className={styles.profileContainer}>
						<div className={styles.profile}>
							<div className={styles.profileImg}>
								<img src={avaProfile} alt='' />
							</div>
							<div className={styles.aboutUser}>
								<div className={styles.usernameEdit}>
									<span>Fodi</span>
									<img src={editProfile} alt='' />
								</div>
								<p className={styles.decriptionProfile}>
									Крути перец, люблу броболи! Крути перец, люблу броболи! Крути
									перец, люблу броболи!
								</p>
								<span className={styles.online}>В сети</span>
							</div>
						</div>

						<hr />

						<div className={styles.filters}>
							{buttons.map(button => (
								<a
									key={button.id}
									href={button.href}
									className={`${styles.filtersBtn} ${
										activeButtonId === button.id ? styles.active : ''
									}`}
									onClick={() => handleButtonClick(button.id)}
								>
									{button.text}
								</a>
							))}
						</div>
					</div>

					<NewsImage
						idPost='1'
						username='Fodi'
						ago='2 часа назад'
						views='351'
						like={921}
						h2Title='Супер крутой заголовок про новость'
						h3Title='Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто'
						usernameLogo={usernameLogo}
						catNewsImg={catNews}
					/>

					<NewsImage
						idPost='2'
						username='Fodi'
						ago='7 часов назад'
						views='726'
						like={1241}
						h2Title='Супер крутой заголовок про новость'
						h3Title='Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто'
						usernameLogo={usernameLogo}
						catNewsImg={null}
					/>
				</div>

				<div>
					<RightSide />
				</div>
			</div>
		</div>
	)
}

export default Profile
