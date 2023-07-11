import axios from "axios";
const API_PATH = "http://localhost:3001/products";
import { Item } from "src/types/Item.d";

export interface Requests {
  getAllItems(): Promise<Array<Item>>;
  getItemsById(id: number): Promise<Array<Item>>;
  getItemByTitle(title: string): Promise<Array<Item>>;
}

class ApiRequests implements Requests {
  async getAllItems() {
    try {
      const data = await axios
        .get(`${API_PATH}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(`error at retrieving list of products: `, err);
        });
      return data;
    } catch (err) {
      console.log(`error caught at retrieving list of products: `, err);
    }
  }
  async getItemsById(id: number) {
    try {
      const data = await axios
        .get(`${API_PATH}?id=${id}`)
        .then((res) => {
          return res.data[0];
        })
        .catch((err) => {
          console.log(`error at retrieving product by id: `, err);
        });
      return data;
    } catch (err) {
      console.log(`error at retrieving product by id: `, err);
    }
  }
  async getItemByTitle(title: string) {
    try {
      const response = await axios.get(API_PATH);
      const data = response.data.filter((item:Item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      );
      return data;
    } catch (error) {
      console.log(`Error retrieving product by title:`, error);
    }
  }
}

export default new ApiRequests();
