import axios from "axios";
import StoreService from "./Store";

const url = "http://localhost:3000/articles";

class ArticleService {
  //Get articles
  static getArticles = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        var data = res.data;

        const newData = await data.map(async (article) => {
          const restorer_details = await StoreService.getStorerInfo(
            article.restorer_id
          );
          return { ...article, restorer_details };
        });

        resolve(Promise.all(newData));
      } catch (err) {
        reject(err);
      }
    });
  };

  static getArticle = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + "/" + id);
        const data = res.data;
        const restorer_details = await StoreService.getStorerInfo(
          data.restorer_id
        );
        const newData = { ...data, restorer_details };
        resolve(newData);
      } catch (err) {
        reject(err);
      }
    });
  };
}

export default ArticleService;
