import axios from "axios";

export default async function (req, res) {
  let topics = ["Data", "Science", "Animals"];

  let apiKey = process.env.NEWSAPIKEY;

  let urls = [
    `https://newsapi.org/v2/everything?q=apple&from=2022-02-28&to=2022-02-28&sortBy=popularity&apiKey=${apiKey}`,
    `https://newsapi.org/v2/everything?q=tesla&from=2022-02-01&sortBy=publishedAt&apiKey=${apiKey}`,
    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
  ];

  let { category, page, limit } = req.query;

  let newPage = page === 0 ? page : page * limit + 1;

  let index = topics.findIndex(topic => topic === category);

  let url = urls[index];

  if (!url) return res.status(200).json([]);

  let { data } = await axios.get(url);

  return res.status(200).json(data.articles.slice(newPage, newPage + 6));
}
