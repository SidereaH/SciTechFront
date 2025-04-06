import React, { useState, useEffect } from 'react'
import styles from './CreateArticle.module.css'
import Header from '../header/Header'
import RightSide from '../mainRightSide/RightSide'

const CreateArticle = () => {
	const [isOpen, setIsOpen] = useState(false)
	// Получаем userId из localStorage
	const userId = localStorage.getItem('userId')
	// Преобразуем в число, если userId существует
	const numericUserId = userId ? Number(userId) : null

	const [selectedCategory, setSelectedCategory] = useState('Выберите категорию')
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		content: '',
		theme: '',
		status: 'PUBLISHED',
		tags: ['science', 'discovery'],
		ownerId: numericUserId, // Используем преобразованный userId
	})

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)

	// Обновляем ownerId при изменении userId
	useEffect(() => {
		const currentUserId = localStorage.getItem('userId')
		const currentNumericUserId = currentUserId ? Number(currentUserId) : null

		setFormData(prev => ({
			...prev,
			ownerId: currentNumericUserId,
		}))
	}, [userId]) // Зависимость от userId

	// ... остальной код без изменений ...

	const categories = [
		'Технологии',
		'Наука',
		'Искусство',
		'Политика',
		'Спорт',
		'Здоровье',
	]

	const toggleDropdown = () => setIsOpen(!isOpen)
	const selectCategory = theme => {
		setSelectedCategory(theme)
		setFormData({ ...formData, theme })
		setIsOpen(false)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (!formData.title || !formData.description || !formData.content) {
			setError('Пожалуйста, заполните все поля')
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('http://localhost:8083/api/news', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error('Ошибка при отправке статьи')
			}

			const result = await response.json()
			console.log('Статья успешно создана:', result)
			setSuccess(true)

			setFormData({
				title: '',
				description: '',
				content: '',
				theme: '',
			})
			setSelectedCategory('Выберите категорию')
		} catch (err) {
			setError(err.message || 'Произошла ошибка при отправке')
			console.error('Ошибка:', err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div>
			<Header />

			<div className={styles.makeArticle}>
				<div className={styles.content}>
					<p className={styles.title}>Создайте свою собственную статью</p>

					{/* Выпадающий список категорий */}
					<div className={styles.dropdownContainer}>
						<div className={styles.dropdownHeader} onClick={toggleDropdown}>
							{selectedCategory}
							<span
								className={`${styles.arrow} ${
									isOpen ? styles.up : styles.down
								}`}
							></span>
						</div>
						{isOpen && (
							<div className={styles.dropdownList}>
								{categories.map((theme, index) => (
									<div
										key={index}
										className={styles.dropdownItem}
										onClick={() => selectCategory(theme)}
									>
										{theme}
									</div>
								))}
							</div>
						)}
					</div>

					{/* Сообщения об ошибке/успехе */}
					{error && <div className={styles.errorMessage}>{error}</div>}
					{success && (
						<div className={styles.successMessage}>
							Статья успешно опубликована!
						</div>
					)}

					<div className={styles.inputsContent}>
						<div className={styles.inputTitle}>
							<p>Заголовок</p>
							<input
								type='text'
								name='title'
								value={formData.title}
								onChange={handleInputChange}
							/>
						</div>
						<div className={styles.inputTitle}>
							<p>Краткое описание</p>
							<input
								type='text'
								name='description'
								value={formData.description}
								onChange={handleInputChange}
							/>
						</div>
						<div className={styles.inputTitle}>
							<p>Статья</p>
							<textarea
								name='content'
								value={formData.content}
								onChange={handleInputChange}
							></textarea>
						</div>
					</div>
					<div className={styles.makeArticleBtn}>
						<button onClick={handleSubmit} disabled={isLoading}>
							{isLoading ? 'Отправка...' : 'Опубликовать'}
						</button>
					</div>
				</div>
				<div>
					<RightSide />
				</div>
			</div>
		</div>
	)
}

export default CreateArticle
