import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_FIREBASE_API
});

export default instance;