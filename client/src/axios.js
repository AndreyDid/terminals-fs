import axios from "axios";

const instance = axios.create({
    baseURL: 'http://82.148.18.40'
})

export default instance