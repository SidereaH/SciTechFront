import React from 'react'
import styles from './RightSide.module.css'
import Filter from './Filter'

const RightSide = () => {
	return (
		<div className={styles.rightSide}>
			<Filter />
		</div>
	)
}

export default RightSide
