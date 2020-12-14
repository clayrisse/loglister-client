import axios from "axios";

class ListService {
  constructor() {
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api/list",
      withCredentials: true
    });
  }

  // getAll = () =>  this.api.get('/all')

  getOne = (idList) => this.api.get(`/${idList}`)

  create = (data)=> this.api.post(`/`, data )

  edit = (idList) => this.api.put(`/${idList}`)

  deleteOne = (idList) => this.api.delete(`/${idList}`)

}


const listService = new ListService();

export default listService;