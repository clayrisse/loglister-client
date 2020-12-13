import axios from "axios";

class ListService {
  constructor() {
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api/list",
      withCredentials: true
    });
  }

  getAll = () =>  this.api.get('/all')

  getOne = (id) => this.api.get(`/${id}`)

  create = (data)=> this.api.post(`/`, data )

  edit = (id) => this.api.put(`/${id}`)

  deleteOne = (id) => this.api.delete(`/${id}`)

}


const listService = new ListService();

export default listService;