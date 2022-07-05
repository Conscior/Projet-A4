import axios from "axios";

const url = "http://localhost:3000/store";

class StoreService {
  //Get restorer info
  static getStorerInfo = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + '/' + id);
        const data = res.data;
        resolve(data);
      } catch (err) {
        console.log(err)
        return false
      }
    });
  };

}

export default StoreService;
