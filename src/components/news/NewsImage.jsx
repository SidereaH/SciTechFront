import React from 'react'
import styles from './NewsImage.module.css'
import usernameLogo from '../../assets/img/usernameLogo.png'
import catNews from '../../assets/img/catNews.png'
import eye from '../../assets/img/eye.png'
import blackHeart from '../../assets/img/blackHeart.svg'

const NewsImage = ({
	username,
	ago,
	views,
	h2Title,
	h3Title,
	like,
	usernameLogo,
	catNewsImg,
}) => {
	return (
		<section>
			<div className={styles.userInfo}>
				<div className={styles.username}>
					<img src={usernameLogo} alt='' />
					<a href=''>{username}</a>
				</div>
				<span className={styles.publicationDate}>{ago}</span>
				<div className={styles.views}>
					<img src={eye} alt='' />
					<span>{views}</span>
				</div>
			</div>

			<div className={styles.title}>
				<h2>{h2Title}</h2>
				<h3>{h3Title}</h3>
			</div>

			<div className={`${catNewsImg === null ? '' : styles.newsImage}`}>
				<img src={catNewsImg} alt='' />
			</div>

			<div className={styles.bottomSide}>
				<div className={styles.like}>
					<div className={styles.heart}>
						<img src={blackHeart} alt='' />
					</div>
					<span>{like}</span>
				</div>

				<div className={styles.readNext}>
					<a href=''>Читать дальше</a>
				</div>
			</div>
		</section>
	)
}

export default NewsImage
