import React from 'react'
import NewsImage from './NewsImage'
import RightSide from '../mainRightSide/RightSide'
import usernameLogo from '../../assets/img/usernameLogo.png'
import catNews from '../../assets/img/catNews.png'
import styles from './NewsImage.module.css'

const News = () => {
	return (
		<div className={styles.mainContainer}>
			<div>
				<NewsImage
					idPost='1'
					username='Fodi'
					ago='2 часа назад'
					views='351'
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
					h2Title='Супер крутой заголовок про новость'
					h3Title='Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто'
					usernameLogo={usernameLogo}
					catNewsImg={null}
				/>

				<NewsImage
					idPost='3'
					username='Evlampiy'
					ago='24.04.2025'
					views='7423'
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
	)
}

export default News
