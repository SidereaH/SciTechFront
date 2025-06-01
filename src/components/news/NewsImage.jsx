import React, { useState, useEffect, useRef } from 'react'
import styles from './NewsImage.module.css'
import axios from 'axios'
import usernameLogo from '../../assets/img/usernameLogo.png'
import catNews from '../../assets/img/catNews.png'
import eye from '../../assets/img/eye.png'
import blackHeart from '../../assets/img/blackHeart.svg'
import redHeart from '../../assets/img/redHeart.png'
import { usePopularNews } from '../hooks/useNews'
function RenderAndCutHTML({ html, maxLength = 100 }) {
	const containerRef = useRef(null)
	const [cutText, setCutText] = useState('')

	useEffect(() => {
		if (containerRef.current) {
			const textContent = containerRef.current.textContent || ''
			const trimmedText =
				textContent.length > maxLength
					? textContent.substring(0, maxLength) + '...'
					: textContent
			setCutText(trimmedText)
		}
	}, [html, maxLength])

	return (
		<>
			<div
				ref={containerRef}
				dangerouslySetInnerHTML={{ __html: html }}
				style={{ display: 'none' }}
			/>
			<div>{cutText}</div>
		</>
	)
}
const NewsImage = ({ id, username, title, description }) => {
	const [liked, setLiked] = useState(false)
	const [likeCount, setLikeCount] = useState('')
	const [viewsCount, setViewsCount] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {})

	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const url = `http://45.155.204.6:5084/api/news/stats/get-likes/${id}`
				const response = await axios.get(url)
				setLikeCount(response.data)
			} catch (error) {
				console.error('Ошибка при загрузке лайков:', error)
			}
		}

		fetchLikes()
	}, [id])

	useEffect(() => {
		const fetchSeems = async () => {
			try {
				const url = `http://45.155.204.6:5084/api/news/stats/get-shows/${id}`
				const response = await axios.get(url)
				setViewsCount(response.data)
			} catch (error) {
				console.error('Ошибка при загрузке лайков:', error)
			}
		}
		fetchSeems()
	}, [id])

	const handleLike = async () => {
		if (isLoading) return

		setIsLoading(true)
		const newLikeStatus = !liked
		const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1

		setLiked(newLikeStatus)
		setLikeCount(newLikeCount)

		try {
			const url = `http://45.155.204.6:5084/api/news/stats/${
				newLikeStatus ? 'add-like' : 'del-like'
			}/${id}`

			await (newLikeStatus ? axios.patch(url) : axios.delete(url))
		} catch (error) {
			console.error('Ошибка:', error)
			setLiked(!newLikeStatus)
			setLikeCount(likeCount)
		} finally {
			setIsLoading(false)
		}
	}

	const formatNumber = num => {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k'
		}
		return num.toString()
	}

	const formatDate = dateString => {
		const date = new Date(dateString)
		const now = new Date()
		const diffHours = Math.floor((now - date) / (1000 * 60 * 60))

		if (diffHours < 24) {
			return `Сегодня`
		} else {
			return `${Math.floor(diffHours / 24)} дней назад`
		}
	}

	return (
		<section id={id} className={styles.newsItem}>
			<div className={styles.userInfo}>
				<div className={styles.username}>
					<img src={usernameLogo} alt='' />
					<a href=''>{username}</a>
				</div>
				<span className={styles.publicationDate}>
					{formatDate(new Date().toISOString())}
				</span>
				<div className={styles.views}>
					<span>{formatNumber(viewsCount)} просмотров</span>
				</div>
			</div>

			<div className={styles.title}>
				<h2>{title}</h2>
				<h3>
					<RenderAndCutHTML html={description} maxLength={170} />
				</h3>
			</div>

			<div className={styles.bottomSide}>
				{/* <div className={styles.like}>
					<button
						onClick={handleLike}
						className={styles.heartButton}
						disabled={isLoading}
					>
						<div className={styles.heart}>
							<img src={liked ? redHeart : blackHeart} alt='' />
						</div>
					</button>
					<span>{formatNumber(likeCount)}</span>
				</div> */}

				<div className={styles.readNext}>
					<a href={`/article/${id}`}>Читать дальше</a>
				</div>
			</div>
		</section>
	)
}
const NewsList = () => {
	// Правильная деструктуризация объекта
	const { news, loading, error } = usePopularNews(0, 10)

	if (loading) return <div className={styles.loading}>Загрузка новостей...</div>
	if (error) return <div className={styles.error}>Ошибка: {error.message}</div>

	if (!news || !news.content) {
		return <div className={styles.empty}>Новости не найдены</div>
	}

	const newsItems = news.content || news

	return (
		<div className={styles.newsContainer}>
			{newsItems.map(item => (
				<NewsImage
					key={item.id}
					id={item.id}
					username={item.owner}
					theme={item.theme}
					status={item.status}
					title={item.title}
					description={item.content}
				/>
			))}
		</div>
	)
}

export default NewsList
