import axios from "axios";

const token = '8b9a2fbd-c45a-4345-8354-54a75198a961'
const apiKey = '2ce9edc9-5880-4110-ab2d-4e4ef2fb6acf'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
});