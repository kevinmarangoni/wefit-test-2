import axios from "axios";
const API_PATH = "http://localhost:3001/products";

export interface Requests {
  getAllItems(): Promise<Array<Object>>
  getItemsById(id: number): Promise<Array<Object>>
  getItemByTitle(title: string): Promise<Array<Object>>
}

class ApiRequests implements Requests {

  async getAllItems() {
    try {
      const data = await axios.get(`${API_PATH}`).then((res) =>{
        return res.data
      })
      .catch((err) => {
        console.log(`error at retrieving list of products: `, err)
      });
      return data;
    }
    catch (err) {
        console.log(`error caught at retrieving list of products: `, err)
    }
  }
  async getItemsById(id: number) {
    try {
        const data = await axios.get(`${API_PATH}?id=${id}`).then((res) =>{
          return res.data
        })
        .catch((err) => {
          console.log(`error at retrieving product by id: `, err)
        });
        return data;
      }
      catch (err) {
          console.log(`error at retrieving product by id: `, err)
      }
  }
  async getItemByTitle(title: string) {
    try {
      const data = await axios.get(`${API_PATH}?title=${title}`).then((res) =>{
        return res.data
      })
      .catch((err) => {
        console.log(`error at retrieving product by title: `, err)
      });
      return data;
    }
    catch (err: any) {
        console.log(`error at retrieving product by title: `, err)
    }
  }
}

export default new ApiRequests()
