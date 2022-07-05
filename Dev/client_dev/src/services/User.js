import axios from "axios";
import { Cookies } from "quasar";

const signupUrl = "http://localhost:3100/signup";
const loginUrl = "http://localhost:3100/login";
const userUrl = "http://localhost:3100/user"; // Used to get, update and delete

class UserService {
  //Get Articles
  static signup = (fname, lname, email, password, gender) => {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = { fname, lname, email, password, gender, scope: "dev" };
        const res = await axios.post(signupUrl, payload);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  static login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = { email, password, scope: "dev" };
        const res = await axios.post(loginUrl, payload);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  static logout = () => {
    Cookies.remove("dev-jwt");
    Cookies.remove("dev-user");
  };

  static update = (fname, lname, email, gender) => {
    const token = Cookies.get("dev-jwt");
    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const payload = { fname, lname, email, gender };
          const res = await axios.put(userUrl, payload, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
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

  static delete = () => {
    const token = Cookies.get("dev-jwt");

    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.delete(userUrl, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = res.data;
          this.logout();
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      return false;
    }
  };

  static getUserInfo = () => {
    const token = Cookies.get("dev-jwt");
    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.get(meUrl, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = res.data.user;
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

export default UserService;
