import axios from "axios";
import { dummyData } from "../dummmydata";

export default async function (req, res) {
  let topics = ["Data", "Science", "Animals"];

  let apiKey = process.env.NEWSAPIKEY;
  let apiKey2 = process.env.NEWSAPIKEY2;

  let urls = [
    `https://newsdata.io/api/1/news?apikey=pub_5113f01322e581ed2f52470a5aea1c276377`,
    `https://newsapi.org/v2/everything?q=tesla&from=2022-02-01&sortBy=publishedAt&apiKey=${apiKey}`,
    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
  ];

  let urls2 = [`https://newsdata.io/api/1/news?apikey=${apiKey2}`];

  let { category, page, limit } = req.query;

  let newPage = page === 0 ? page : page * limit + 1;

  let index = topics.findIndex(topic => topic === category);

  let url = urls2[index];

  //if (!url) return res.status(200).json([]);

  //let { data } = await axios.get(url);

  return res.status(200).json(dummyData.filter(({ category: cat }) => cat === category).slice(newPage, newPage + 6));
}
