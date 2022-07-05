import axios from "axios";
import { Cookies } from "quasar";

const signupUrl = "http://localhost:3000/signup";
const loginUrl = "http://localhost:3000/login";
const userUrl = "http://localhost:3000/user"; // Used to get, update and delete

class UserService {
  //Get Articles
  static signup = (fname, lname, email, password, gender, phone, address) => {
    return new Promise(async (resolve, reject) => {
      try {
        const payload = { fname, lname, email, password, gender, phone, address, scope: "client" };
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
        const payload = { email, password, scope: "client" };
        const res = await axios.post(loginUrl, payload);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };

  static logout = () => {
    Cookies.remove("client-jwt");
    Cookies.remove("client-user");
  };

  static update = (fname, lname, email, gender, phone, address) => {
    const token = Cookies.get("client-jwt");
    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const payload = { fname, lname, email, gender, phone, address };
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
      return false
    }
  };

  static delete = () => {
    const token = Cookies.get("client-jwt");

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
    const token = Cookies.get("client-jwt");
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
