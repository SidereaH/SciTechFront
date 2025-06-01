import axios from 'axios'

const API_BASE_URL = 'http://45.155.204.6:5084/api/news'

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Новости по заголовку
export const getNewsByTitle = async (title, page = 0, size = 10) => {
	try {
		const response = await api.get('/by-title', {
			params: { title, page, size },
		})
		return response.data
	} catch (error) {
		console.error('Error fetching news by title:', error)
		throw error
	}
}

// Новости по дате
export const getNewsByDateRange = async (
	startDate,
	endDate,
	page = 0,
	size = 10
) => {
	try {
		const response = await api.get('/by-date-range', {
			params: {
				start: startDate.toISOString().split('T')[0],
				end: endDate.toISOString().split('T')[0],
				page,
				size,
			},
		})
		return response.data
	} catch (error) {
		console.error('Error fetching news by date range:', error)
		throw error
	}
}

// Новости по тегам
export const getNewsByTags = async (tags, page = 0, size = 10) => {
	try {
		const response = await api.get('/by-tags', {
			params: { tags, page, size },
		})
		return response.data
	} catch (error) {
		console.error('Error fetching news by tags:', error)
		throw error
	}
}

// Новости по теме
export const getNewsByTheme = async (theme, page = 0, size = 10) => {
	try {
		const response = await api.get('/by-theme', {
			params: { theme, page, size },
		})
		return response.data
	} catch (error) {
		console.error('Error fetching news by theme:', error)
		throw error
	}
}

// Новости по автору
export const getNewsByAuthor = async (ownerId, page = 0, size = 10) => {
	try {
		const response = await api.get('/by-author', {
			params: { ownerId, page, size },
		})
		return response.data
	} catch (error) {
		console.error('Error fetching news by author:', error)
		throw error
	}
}

// Поиск новостей с фильтрами
export const searchNews = async (
	filters = {},
	page = 0,
	size = 10,
	sort = 'dateOfCreation,desc'
) => {
	try {
		const response = await api.get('/search', {
			params: { ...filters, page, size, sort },
		})
		return response.data
	} catch (error) {
		console.error('Error searching news:', error)
		throw error
	}
}

// Создать новость
export const createNews = async newsData => {
	try {
		const response = await api.post('', newsData)
		return response.data
	} catch (error) {
		console.error('Error creating news:', error)
		throw error
	}
}

// Популярные новости
export const getPopularNews = async (page = 0, size = 10) => {
	try {
		const response = await api.get('/popular', {
			params: { page, size },
		})
		return response.data
	} catch (error) {
		console.error('Error fetching popular news:', error)
		throw error
	}
}

// Создать несколько новостей
export const createNewsList = async newsList => {
	try {
		const response = await api.post('/list', newsList)
		return response.data
	} catch (error) {
		console.error('Error creating news list:', error)
		throw error
	}
}

// Получить новость по ID
export const getNewsById = async id => {
	try {
		const response = await api.get(`/id/${id}`)
		return response.data
	} catch (error) {
		console.error('Error fetching news by ID:', error)
		throw error
	}
}

export default api
