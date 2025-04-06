/**
 * Создает новую новость
 * @param {object} newsData - Данные новости
 * @param {number} newsData.ownerId - ID владельца новости
 * @param {string} newsData.theme - Тема новости
 * @param {string} newsData.status - Статус новости
 * @param {string} newsData.title - Заголовок новости
 * @param {string} newsData.description - Описание новости
 * @param {string} newsData.content - Содержание новости
 * @param {string} newsData.url - URL новости
 * @param {number} newsData.likes - Количество лайков
 * @param {number} newsData.shows - Количество просмотров
 * @param {string[]} newsData.tags - Теги новости
 * @param {string} newsData.dateOfCreation - Дата создания (формат YYYY-MM-DD)
 * @returns {Promise<object>} Созданная новость
 */
export const createNews = async (newsData) => {
    try {
      return await apiRequest(
        'POST',
        '/api/news',
        newsData
      );
    } catch (error) {
      console.error('Ошибка при создании новости:', error);
      throw error;
    }
  };