import React from 'react'
import styles from './RightSide.module.css'

const BestNews = ({ titleInterest, imgInterest }) => {
	return (
		<a className={styles.bestNewsLink} href=''>
			<img src={imgInterest} alt='' />
			<span>{titleInterest}</span>
		</a>
	)
}

export default BestNews
