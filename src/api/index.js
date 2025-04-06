import axios from "axios";

const baseUrl = "http://localhost:8083";

/**
 * Универсальная функция для выполнения HTTP-запросов.
 * @param {string} method - HTTP-метод (GET, POST, PUT, DELETE).
 * @param {string} endpoint - Конечный путь API.
 * @param {object} [data] - Тело запроса (если нужно).
 * @param {object} [params] - URL-параметры (опционально).
 * @returns {Promise} Promise с данными ответа от сервера.
 */
export const apiRequest = async (method, endpoint, data, params) => {
  try {
    const config = {
      method,
      url: `${baseUrl}${endpoint}`, // Полный URL
      data, // Тело запроса
      params, // Если метод GET - параметры в URL
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);
    return response.data; // возвращаем данные из ответа
  } catch (error) {
    console.error(
      `Ошибка при запросе ${method} ${endpoint}:`,
      error.response?.data || error.message
    );
    throw error; // выбрасываем ошибку, чтобы ее можно было обработать выше
  }
};
