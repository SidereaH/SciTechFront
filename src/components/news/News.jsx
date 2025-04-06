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
				<NewsImage />
			</div>

			<div>
				<RightSide />
			</div>
		</div>
	)
}

export default News
