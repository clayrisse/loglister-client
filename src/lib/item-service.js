import axios from "axios";

class ItemService {
  constructor() {
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api/item",
      withCredentials: true
    });
  }

  getOne = (id) => this.api.get(`/${id}`)

  create = (data)=> this.api.post(`/`, data )

  edit = (id) => this.api.put(`/${id}`)

  deleteOne = (id) => this.api.delete(`/${id}`)

}


const itemService = new ItemService();

export default itemService;