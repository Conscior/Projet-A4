import axios from "axios";
import { Cookies } from "quasar";

const url = "http://localhost:3000/orders";

class OrderService {

  //Get a specefic order
  static getOrder = (order_id) => {
    const token = Cookies.get("client-jwt");
    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const header = {
            headers: {
              Authorization: "Bearer " + token,
            },
          };
          const res = await axios.get(url + '/' + order_id, header);
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

  //Get curently logged in user order's
  static getOrders = () => {
    const token = Cookies.get("client-jwt");
    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const header = {
            headers: {
              Authorization: "Bearer " + token,
            },
          };
          const res = await axios.get(url, header);
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
  

  //Create an order
  static postOrder = (
    details,
    customer_details,
    restorer_details,
    status
  ) => {
    const token = Cookies.get("client-jwt");

    if (token) {
      return new Promise(async (resolve, reject) => {
        try {
          const payload = {
            details,
            customer_details,
            restorer_details,
            status,
          };
          const res = await axios.post(url, payload, {
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
}

export default OrderService;