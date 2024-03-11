import axios, { CanceledError } from 'axios';

const http =  axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export default http;
export { CanceledError };
