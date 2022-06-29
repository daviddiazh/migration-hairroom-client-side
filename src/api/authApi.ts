
import axios from 'axios';

const authApi = axios.create({
    //baseURL: 'http://localhost:8080/api/auth',
    baseURL: 'https://api-hairroom-v1.herokuapp.com/api/auth',
})

export default authApi;