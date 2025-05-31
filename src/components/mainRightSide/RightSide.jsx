import React, { useState } from 'react'
import styles from './RightSide.module.css'
import Filter from './Filter'

const RightSide = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<button
				className={styles.mobileToggle}
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? '×' : '≡'}
			</button>

			<div className={`${styles.rightSide} ${isOpen ? styles.open : ''}`}>
				<Filter />
			</div>
		</>
	)
}

export default RightSide
