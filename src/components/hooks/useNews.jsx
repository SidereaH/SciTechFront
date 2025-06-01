import { useState, useEffect } from 'react'
import {
	getNewsByTitle,
	getNewsByDateRange,
	getNewsByTags,
	getNewsByTheme,
	getNewsByAuthor,
	searchNews,
	createNews,
	getPopularNews,
	createNewsList,
	getNewsById,
} from '../api/apiNews'

// Хук для поиска новостей по заголовку
export const useNewsByTitle = (title, page = 0, size = 10) => {
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			if (!title) return

			setLoading(true)
			try {
				const data = await getNewsByTitle(title, page, size)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [title, page, size])

	return { news, loading, error }
}

// Хук для поиска новостей по дате
export const useNewsByDateRange = (startDate, endDate, page = 0, size = 10) => {
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			if (!startDate || !endDate) return

			setLoading(true)
			try {
				const data = await getNewsByDateRange(startDate, endDate, page, size)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [startDate, endDate, page, size])

	return { news, loading, error }
}

// Хук для поиска новостей по тегам
export const useNewsByTags = (tags, page = 0, size = 10) => {
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			if (!tags || tags.length === 0) return

			setLoading(true)
			try {
				const data = await getNewsByTags(tags, page, size)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [tags, page, size])

	return { news, loading, error }
}

// Хук для поиска новостей по теме
export const useNewsByTheme = (theme, page = 0, size = 10) => {
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			if (!theme) return

			setLoading(true)
			try {
				const data = await getNewsByTheme(theme, page, size)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [theme, page, size])

	return { news, loading, error }
}

// Хук для поиска новостей по автору
export const useNewsByAuthor = (ownerId, page = 0, size = 10) => {
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			if (!ownerId) return

			setLoading(true)
			try {
				const data = await getNewsByAuthor(ownerId, page, size)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [ownerId, page, size])

	return { news, loading, error }
}

// Хук для поиска новостей с фильтрами
export const useSearchNews = (
	filters,
	page = 0,
	size = 10,
	sort = 'dateOfCreation,desc'
) => {
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			setLoading(true)
			try {
				const data = await searchNews(filters, page, size, sort)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [filters, page, size, sort])

	return { news, loading, error }
}

// Хук для создания новости
export const useCreateNews = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [createdNews, setCreatedNews] = useState(null)

	const create = async newsData => {
		setLoading(true)
		try {
			const data = await createNews(newsData)
			setCreatedNews(data)
			setError(null)
			return data
		} catch (err) {
			setError(err)
			throw err
		} finally {
			setLoading(false)
		}
	}

	return { create, createdNews, loading, error }
}

// Хук для получения популярных новостей
export const usePopularNews = (page = 0, size = 10) => {
	const [news, setNews] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			setLoading(true)
			try {
				const data = await getPopularNews(page, size)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [page, size])

	return { news, loading, error }
}

// Хук для создания списка новостей
export const useCreateNewsList = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [createdNewsList, setCreatedNewsList] = useState(null)

	const createList = async newsList => {
		setLoading(true)
		try {
			const data = await createNewsList(newsList)
			setCreatedNewsList(data)
			setError(null)
			return data
		} catch (err) {
			setError(err)
			throw err
		} finally {
			setLoading(false)
		}
	}

	return { createList, createdNewsList, loading, error }
}

// Хук для получения новости по ID
export const useNewsById = id => {
	const [news, setNews] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			if (!id) return

			setLoading(true)
			try {
				const data = await getNewsById(id)
				setNews(data)
				setError(null)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}

		fetchNews()
	}, [id])

	return { news, loading, error }
}
