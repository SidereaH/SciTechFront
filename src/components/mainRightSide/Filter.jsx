import React from 'react'
import styles from './RightSide.module.css'
import Radio from './RadioButton'
import BestNews from './BestNews'
import BestNewsImg from '../../assets/img/filterGuide.png'

const Filter = () => {
	return (
		<div className={styles.filter}>
			<div className={styles.search}>
				<span>Поиск</span>
				<div className={styles.findInput}>
					<input type='text' />
					<button>Найти</button>
				</div>
			</div>
			<Radio />
			<div className={styles.bestNews}>
				<span>Полезные статьи</span>
				<div className={styles.bestNewsContainer}>
					<BestNews
						titleInterest='Что будет, если не использовать TCP или UDP?'
						imgInterest={BestNewsImg}
					/>
				</div>
			</div>
		</div>
	)
}

export default Filter
