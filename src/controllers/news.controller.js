import { newsService } from '../services/news.service.js';

const getNewsById = async (req, res) => {
  const newsId = req.params.id;

  if (!newsId) {
    throw ApiError.badRequest('Bad request', errors);
  }

  const news = await newsService.getNewsById(newsId);

  res.status(200).send(news);
};

const getNews = async (req, res) => {
  let limit, offset;

  if (req.body.limit) {
    limit = req.body.limit;
  }

  if (req.body.offset) {
    offset = req.body.offset;
  }

  const news = await newsService.getNews(limit, offset);

  res.status(200).send(news);
};

export const newsController = {
  getNewsById,
  getNews,
};
