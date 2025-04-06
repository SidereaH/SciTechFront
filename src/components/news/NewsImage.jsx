import React, { useState, useEffect } from 'react'
import styles from './NewsImage.module.css'
import usernameLogo from '../../assets/img/usernameLogo.png'
import catNews from '../../assets/img/catNews.png'
import eye from '../../assets/img/eye.png'
import blackHeart from '../../assets/img/blackHeart.svg'
import redHeart from '../../assets/img/redHeart.png'
import axios from 'axios'

const NewsImage = ({
	username,
	ago,
	views,
	h2Title,
	h3Title,
	usernameLogo,
	catNewsImg,
	idPost,
}) => {
	const [liked, setLiked] = useState(false)
	const [likeCount, setLikeCount] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const url = `http://localhost:8083/api/news/stats/get-likes/${idPost}`
				const response = await axios.get(url)
				setLikeCount(response.data)
			} catch (error) {
				console.error('Ошибка при загрузке лайков:', error)
			}
		}

		fetchLikes()
	}, [idPost])

	const handleLike = async () => {
		if (isLoading) return

		setIsLoading(true)
		const newLikeStatus = !liked
		const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1

		setLiked(newLikeStatus)
		setLikeCount(newLikeCount)

		try {
			const url = `http://localhost:8083/api/news/stats/${
				newLikeStatus ? 'add-like' : 'del-like'
			}/${idPost}`

			const response = newLikeStatus
				? await axios.patch(url, { like: newLikeStatus })
				: await axios.delete(url)

			if (response.data) {
				setLikeCount(response.data.likes ?? newLikeCount)
				setLiked(response.data.likedByCurrentUser ?? newLikeStatus)
			}
		} catch (error) {
			console.error('Ошибка:', error)
			setLiked(!newLikeStatus)
			setLikeCount(likeCount)
		} finally {
			setIsLoading(false)
		}
	}

	const formatNumber = num => {
		if (typeof num === 'string') return num
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k'
		}
		return num.toString()
	}

	return (
		<section id={idPost}>
			<div className={styles.userInfo}>
				<div className={styles.username}>
					<img src={usernameLogo} alt='' />
					<a href=''>{username}</a>
				</div>
				<span className={styles.publicationDate}>{ago}</span>
				<div className={styles.views}>
					<img src={eye} alt='' />
					<span>{formatNumber(views)}</span>
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
					<button
						onClick={handleLike}
						className={styles.heartButton}
						disabled={isLoading}
					>
						<div className={styles.heart}>
							<img
								src={liked ? redHeart : blackHeart}
								alt={liked ? 'Лайк поставлен' : 'Лайк не поставлен'}
							/>
						</div>
					</button>
					<span>{formatNumber(likeCount)}</span>
				</div>

				<div className={styles.readNext}>
					<a href={`/acticle/${idPost}`}>Читать дальше</a>
				</div>
			</div>
		</section>
	)
}

export default NewsImage
