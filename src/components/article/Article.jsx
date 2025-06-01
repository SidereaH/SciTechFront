import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import RightSide from '../mainRightSide/RightSide'
import styles from './Article.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import usernameLogo from '../../assets/img/usernameLogo.png'
import catNews from '../../assets/img/catNews.png'
import eye from '../../assets/img/eye.png'
import blackHeart from '../../assets/img/blackHeart.svg'
import redHeart from '../../assets/img/redHeart.png'
const Article = () => {
	const { id } = useParams()
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [viewsCount, setViewsCount] = useState(0)
	const [liked, setLiked] = useState(false)
	const [likeCount, setLikeCount] = useState('')

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
		const fetchNews = async () => {
			try {
				const response = await axios.get(
					`http://45.155.204.6:5084/api/news/id/${id}`
				)
				setNews(response.data)
			} catch (err) {
				setError(err.message)
				console.error('Ошибка при загрузке новостей:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [id])
	useEffect(() => {
		console.log('works')
		const addSeems = async () => {
			try {
				const url = `http://45.155.204.6:5084/api/news/stats/add-show/${id}`
				const response = await axios.patch(url)
				// setViewsCount(response.data)
			} catch (error) {
				console.error('Ошибка при загрузке лайков:', error)
			}
		}
		addSeems()
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

	const formatDate = dateString => {
		return format(new Date(dateString), 'd MMMM yyyy', { locale: ru })
	}
	const formatNumber = num => {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k'
		}
		return num.toString()
	}
	const renderHTML = html => {
		const cleanHtml = DOMPurify.sanitize(html)
		return { __html: cleanHtml }
	}
	const handleLike = async () => {
		if (loading) return

		// setLoading(true)
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
			setLiked(!newLikeStatus)
			setLikeCount(likeCount)
			console.error('Ошибка:', error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) return <div className={styles.loading}>Загрузка новости...</div>
	if (error) return <div className={styles.error}>Ошибка: {error}</div>
	if (!news) return <div className={styles.error}>Новость не найдена</div>

	return (
		<div className={styles.pageContainerDark}>
			<Header darkMode={true} />

			<div className={styles.mainContainerDark}>
				<div className={styles.articleContainerDark}>
					<article className={styles.articleDark}>
						<div className={styles.articleHeaderDark}>
							<div className={styles.tagsDark}>
								{news.tags.map((tag, index) => (
									<span key={index} className={styles.tagDark}>
										#{tag}
									</span>
								))}
							</div>
							<h1 className={styles.titleDark}>{news.title}</h1>

							<div className={styles.metaDark}>
								<span className={styles.dateDark}>
									{formatDate(news.dateOfCreation)}
								</span>
								<span className={styles.viewsDark}>
									Просмотров: {news.shows}
								</span>
								{/* <span className={styles.likesDark}>Лайков: {news.likes}</span> */}
							</div>
						</div>

						<div className={styles.articleContentDark}>
							<div
								className={styles.contentDark}
								dangerouslySetInnerHTML={renderHTML(news.content)}
							/>
						</div>

						<div className={styles.articleFooterDark}>
							<div className={styles.authorInfoDark}>
								<div>
									<div className={styles.authorAvatarDark}>
										<img src={usernameLogo} alt='Автор' />
									</div>
									<div className={styles.authorDetailsDark}>
										<span className={styles.authorNameDark}>
											Автор: ID {news.ownerId}
										</span>
										<span className={styles.articleStatusDark}>
											{news.status}
										</span>
									</div>
								</div>

								<div className={styles.like}>
									<button
										onClick={handleLike}
										className={styles.heartButton}
										disabled={loading}
									>
										<div className={styles.heart}>
											<img src={liked ? redHeart : blackHeart} alt='' />
										</div>
									</button>
									<span>{formatNumber(likeCount)}</span>
								</div>
							</div>
						</div>
					</article>
				</div>

				<div className={styles.sidebarDark}>
					<RightSide darkMode={true} />
				</div>
			</div>
		</div>
	)
}

export default Article
