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
					username='Fodi'
					ago='2 часа назад'
					views='351'
					like='921'
					h2Title='Супер крутой заголовок про новость'
					h3Title='Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто'
					usernameLogo={usernameLogo}
					catNewsImg={catNews}
				/>

				<NewsImage
					username='Fodi'
					ago='7 часов назад'
					views='726'
					like='1.2k'
					h2Title='Супер крутой заголовок про новость'
					h3Title='Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто, Описание супер крутой новости, как же круууто'
					usernameLogo={usernameLogo}
					catNewsImg={null}
				/>

				<NewsImage
					username='Evlampiy'
					ago='24.04.2025'
					views='7.4k'
					like='24k'
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
