import axios from "axios";

class ServerService {

  constructor() {
    this.api = axios.create({        
      // baseURL: "http://localhost:5000/api",
      // baseURL: "http://localhost:5000",
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

// list routes

  getAllUserInfo = () =>  this.api.get('/api/user')

  editUser = (user) =>  this.api.put('/api/user', user)

  uploadImage = (uploadData) =>  this.api.post('/api/user/upload', uploadData)
  
  deleteUser = () =>  this.api.delete('/api/user')


// list routes

  getOneList = (idList) => this.api.get(`/api/list/${idList}`)

  createList = (listData)=> this.api.post(`/api/list`, listData )

  editList = (idList, listData) => this.api.put(`/api/list/${idList}`, listData)

  deleteOneList = (idList) => this.api.delete(`/api/list/${idList}`)


// item routes

  getOneItem = (idItem) => this.api.get(`/api/item/${idItem}`)

  createItem = (listId, title)=> this.api.post(`/api/item/${listId}`, title )

  editItem = (idItem) => this.api.put(`/api/item/${idItem}`)
  
  checkItem = (idItem, isDone) => this.api.put(`/api/item/check/${idItem}`, isDone)

  deleteOneItem = (idItem) => this.api.delete(`/api/item/${idItem}`)

}


const serverService = new ServerService();
export default serverService;