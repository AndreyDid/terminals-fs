import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.1.79'
})

export default instance