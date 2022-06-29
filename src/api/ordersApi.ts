import axios from 'axios';

const ordersApi = axios.create({
    //baseURL: 'http://localhost:8080/api',
    baseURL: 'https://api-hairroom-v1.herokuapp.com/api',
})

export default ordersApi;