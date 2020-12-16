import axios from "axios";

class ServerService {

  constructor() {
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api",
      // baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

// list routes

  getAllUserInfo = () =>  this.api.get('/user')

  editUser = (user) =>  this.api.put('/user', user)

  uploadImage = (uploadData) =>  this.api.post('/user/upload', uploadData)
  
  deleteUser = () =>  this.api.delete('/user')


// list routes

  getOneList = (idList) => this.api.get(`/list/${idList}`)

  createList = (listData)=> this.api.post(`/list`, listData )

  editList = (idList, listData) => this.api.put(`/list/${idList}`, listData)

  deleteOneList = (idList) => this.api.delete(`/list/${idList}`)


// item routes

  getOneItem = (idList) => this.api.get(`/item/${idList}`)

  createItem = (listId, title)=> this.api.post(`/item/${listId}`, title )

  editItem = (idItem) => this.api.put(`/item/${idItem}`)

  deleteOneItem = (idItem) => this.api.delete(`/item/${idItem}`)

}


const serverService = new ServerService();
export default serverService;