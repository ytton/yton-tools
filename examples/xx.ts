import { request } from '../dist/index.d';
import axios from 'axios';
const http = request.create<res>({
  handleResponse(res) {
    res = res.data;
    return res;
  }
});
type user = {
  name: string;
};
type res<T = unknown> = T;
http.get<user>('').then(res => {});


// const res = axios.create({
// })
// res.interceptors.response.use((res)=>{
//   res = res.data
//   return res;
// })

// type User = {
//   name:string
// }
// type Res<T> = T

// res.get<User>('user').then(res=>{
//   res.name
// })
// res.get<User,Res<User>>('user').then(res=>{
//   res.name
// })


