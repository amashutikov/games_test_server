import { NewsModel } from '../models/news.js';

const getNewsById = async (id) => {
  try {
    const news = await NewsModel.findById(id).exec();

    return news;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

const getNews = async (limit = 5, offset = 0) => {
  try {
    const news = await NewsModel.find().skip(offset).limit(limit).exec();
    return news;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const newsService = {
  getNewsById,
  getNews,
};
