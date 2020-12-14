import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api/user",
      withCredentials: true
    });
  }

  getAllUserInfo = () =>  this.api.get('/')

  // getOne = (id) => this.api.get(`/${id}`)

  // create = (data)=> this.api.post(`/`, data )

  // edit = (id) => this.api.put(`/${id}`)

  // deleteOne = (id) => this.api.delete(`/${id}`)

}


const userService = new UserService();

export default userService;