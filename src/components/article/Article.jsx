import React from 'react'
import Header from '../header/Header'
import NewsImage from '../news/NewsImage'
import RightSide from '../mainRightSide/RightSide'
import styles from './Article.module.css'
import usernameLogo from '../../assets/img/usernameLogo.png'
import catNews from '../../assets/img/catNews.png'

const Article = () => {
	return (
		<div>
			<Header />

			<div className={styles.mainContainer}>
				<div className={styles.container}>
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
				</div>
				<div>
					<RightSide />
				</div>
			</div>
		</div>
	)
}

export default Article
