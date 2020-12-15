import axios from "axios";

class ItemService {
  constructor() {
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api/item",
      // baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  getOne = (idList) => this.api.get(`/${idList}`)

  create = (data)=> this.api.post(`/`, data )

  edit = (idItem) => this.api.put(`/${idItem}`)

  deleteOne = (idItem) => this.api.delete(`/${idItem}`)

}


const itemService = new ItemService();

export default itemService;