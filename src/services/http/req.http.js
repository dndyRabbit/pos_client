import axiosAPI from '@/services/Axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export const get = (url, config = {}) => {
    return axiosAPI.get(`${BASE_URL}/${url}`, config)
}
export const customGet = (url) => {
    return axiosAPI.get(url);
}
export const post = (url, data, config = {}) => {
    return axiosAPI.post(`${BASE_URL}/${url}`, data, config)
}
export const put = (url, data, config = {}) => {
    return axiosAPI.put(`${BASE_URL}/${url}`, data, config)
}