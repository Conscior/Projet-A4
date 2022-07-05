import axios from "axios";
import { Cookies } from "quasar";


const url = "http://localhost:3100/components";

class ComponentService {
  static getComponents = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        var data = res.data;

        resolve(Promise.all(data));
      } catch (err) {
        reject(err);
      }
    });
  };

  static postComponent = (name, img, npm_url) => {
    const token = Cookies.get("dev-jwt");
    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const payload = {
            name,
            img,
            url: npm_url,
          };
          const header = {
            headers: {
              Authorization: "Bearer " + token,
            },
          };
          const res = await axios.post(url, payload, header);
          const data = res.data;
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      return false;
    }
  };
}

export default ComponentService;
