import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://id.safav2.io.safavisa.com'
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;