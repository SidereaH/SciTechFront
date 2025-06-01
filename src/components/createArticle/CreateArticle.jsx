import React, { useState, useEffect } from 'react'
import styles from './CreateArticle.module.css'
import Header from '../header/Header'
import RightSide from '../mainRightSide/RightSide'
import { FiChevronDown, FiChevronUp, FiCheck, FiPlus } from 'react-icons/fi'

const CreateArticle = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [tags, setTags] = useState([])
	const [tagInput, setTagInput] = useState('')
	const userId = localStorage.getItem('userId')
	const numericUserId = userId ? Number(userId) : null

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		content: '',
		theme: '',
		status: 'Опубликовано',
		tags: [],
		ownerId: numericUserId,
	})

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		const currentUserId = localStorage.getItem('userId')
		const currentNumericUserId = currentUserId ? Number(currentUserId) : null

		setFormData(prev => ({
			...prev,
			ownerId: currentNumericUserId,
		}))
	}, [userId])

	const categories = [
		'Технологии',
		'Наука',
		'Искусство',
		'Политика',
		'Спорт',
		'Здоровье',
		'Путешествия',
		'Еда',
		'Финансы',
	]

	const toggleDropdown = () => setIsOpen(!isOpen)

	const selectCategory = theme => {
		setFormData({ ...formData, theme })
		setIsOpen(false)
	}

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleTagInputChange = e => {
		setTagInput(e.target.value)
	}

	const addTag = () => {
		if (tagInput.trim() && !tags.includes(tagInput.trim())) {
			const newTags = [...tags, tagInput.trim()]
			setTags(newTags)
			setFormData({ ...formData, tags: newTags })
			setTagInput('')
		}
	}

	const removeTag = tagToRemove => {
		const newTags = tags.filter(tag => tag !== tagToRemove)
		setTags(newTags)
		setFormData({ ...formData, tags: newTags })
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter' && tagInput.trim()) {
			addTag()
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (
			!formData.title ||
			!formData.description ||
			!formData.content ||
			!formData.theme
		) {
			setError('Пожалуйста, заполните все обязательные поля')
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('http://45.155.204.6:5084/api/news', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Ошибка при отправке статьи')
			}

			const result = await response.json()
			console.log('Статья успешно создана:', result)
			setSuccess(true)

			// Сброс формы
			setFormData({
				title: '',
				description: '',
				content: '',
				theme: '',
				status: 'Опубликовано',
				tags: [],
				ownerId: numericUserId,
			})
			setTags([])

			// Автоматическое скрытие сообщения об успехе через 5 секунд
			setTimeout(() => setSuccess(false), 5000)
		} catch (err) {
			setError(err.message || 'Произошла ошибка при отправке')
			console.error('Ошибка:', err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.mainContent}>
				<div className={styles.articleForm}>
					<h1 className={styles.title}>Создать новую статью</h1>
					<p className={styles.subtitle}>
						Поделитесь своими знаниями и идеями с сообществом
					</p>

					{error && (
						<div className={styles.alertError}>
							<div className={styles.alertContent}>
								{error}
								<button
									onClick={() => setError(null)}
									className={styles.alertClose}
								>
									&times;
								</button>
							</div>
						</div>
					)}

					{success && (
						<div className={styles.alertSuccess}>
							<div className={styles.alertContent}>
								<FiCheck className={styles.successIcon} />
								Статья успешно опубликована!
							</div>
						</div>
					)}

					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.formGroup}>
							<label htmlFor='title' className={styles.label}>
								Заголовок <span className={styles.required}>*</span>
							</label>
							<input
								type='text'
								id='title'
								name='title'
								value={formData.title}
								onChange={handleInputChange}
								className={styles.input}
								placeholder='Введите заголовок статьи'
								maxLength='120'
							/>
							<div className={styles.charCounter}>
								{formData.title.length}/120 символов
							</div>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='description' className={styles.label}>
								Краткое описание <span className={styles.required}>*</span>
							</label>
							<input
								type='text'
								id='description'
								name='description'
								value={formData.description}
								onChange={handleInputChange}
								className={styles.input}
								placeholder='Опишите суть статьи в 1-2 предложениях'
								maxLength='200'
							/>
							<div className={styles.charCounter}>
								{formData.description.length}/200 символов
							</div>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}>
								Категория <span className={styles.required}>*</span>
							</label>
							<div className={styles.dropdownContainer}>
								<div className={styles.dropdownHeader} onClick={toggleDropdown}>
									{formData.theme || 'Выберите категорию'}
									{isOpen ? <FiChevronUp /> : <FiChevronDown />}
								</div>
								{isOpen && (
									<div className={styles.dropdownList}>
										{categories.map((category, index) => (
											<div
												key={index}
												className={`${styles.dropdownItem} ${
													formData.theme === category ? styles.selected : ''
												}`}
												onClick={() => selectCategory(category)}
											>
												{category}
												{formData.theme === category && (
													<FiCheck className={styles.checkIcon} />
												)}
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='content' className={styles.label}>
								Содержание статьи <span className={styles.required}>*</span>
							</label>
							<textarea
								id='content'
								name='content'
								value={formData.content}
								onChange={handleInputChange}
								className={styles.textarea}
								placeholder='Напишите свою статью здесь...'
								rows='10'
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='tags' className={styles.label}>
								Теги
							</label>
							<div className={styles.tagsContainer}>
								<div className={styles.tagsInput}>
									<input
										type='text'
										value={tagInput}
										onChange={handleTagInputChange}
										onKeyDown={handleKeyDown}
										className={styles.input}
										placeholder='Добавьте теги (нажмите Enter)'
									/>
									<button
										type='button'
										onClick={addTag}
										className={styles.addTagButton}
										disabled={!tagInput.trim()}
									>
										<FiPlus />
									</button>
								</div>
								<div className={styles.tagsList}>
									{tags.map((tag, index) => (
										<span key={index} className={styles.tag}>
											{tag}
											<button
												type='button'
												onClick={() => removeTag(tag)}
												className={styles.removeTag}
											>
												&times;
											</button>
										</span>
									))}
								</div>
							</div>
						</div>

						<div className={styles.formActions}>
							<button
								type='submit'
								className={styles.submitButton}
								disabled={isLoading}
							>
								{isLoading ? (
									<span className={styles.spinner}></span>
								) : (
									'Опубликовать статью'
								)}
							</button>
						</div>
					</form>
				</div>

				<div className={styles.sidebar}>
					{/* <RightSide /> */}
					<div className={styles.tipsCard}>
						<h3>Советы по написанию</h3>
						<ul>
							<li>Используйте четкий и информативный заголовок</li>
							<li>Разбивайте текст на абзацы для лучшей читаемости</li>
							<li>Добавляйте изображения и примеры</li>
							<li>Проверяйте орфографию и грамматику</li>
							<li>Выбирайте релевантные теги</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateArticle
