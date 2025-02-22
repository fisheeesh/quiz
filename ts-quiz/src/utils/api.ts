import axios from "axios";

const fakeApiURL = 'http://localhost:3000'

export const api = axios.create({
    baseURL: fakeApiURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})