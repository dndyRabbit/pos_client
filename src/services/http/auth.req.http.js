import axiosAPI from '@/services/Axios';
import { getFnbEntity } from '@/utils/cookies';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

let session = getFnbEntity();

let config;

export const authGet = (url, conf = {}) => {
    session = typeof window != 'undefined' ? JSON.parse(localStorage.getItem('current_user')) : null;
    config = {
        headers: {
            'X-fnb': session
        }
    }
    return axiosAPI.get(`${BASE_URL}/${url}`, { ...config, ...conf })
}

export const authPost = (url, data) => {
    session = typeof window != 'undefined' ? JSON.parse(localStorage.getItem('current_user')) : null;
    config = {
        headers: {
            'X-fnb': session
        }
    }
    return axiosAPI.post(`${BASE_URL}/${url}`, data, config)
}

export const authPostFormData = (url, data, conf = {}) => {
    session = typeof window != 'undefined' ? JSON.parse(localStorage.getItem('current_user')) : null;
    config = {
        headers: {
            'X-fnb': session
        }
    }

    return axiosAPI.post(`${BASE_URL}/${url}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-fnb': session
        },
        ...conf
    })
}

export const authPut = (url, data) => {
    session = typeof window != 'undefined' ? JSON.parse(localStorage.getItem('current_user')) : null;
    config = {
        headers: {
            'X-fnb': session
        }
    }
    return axiosAPI.put(`${BASE_URL}/${url}`, data, config)
}

export const authDel = (url) => {
    session = typeof window != 'undefined' ? JSON.parse(localStorage.getItem('current_user')) : null;
    config = {
        headers: {
            'X-fnb': session
        }
    }
    return axiosAPI.delete(`${BASE_URL}/${url}`, config)
}

export const downloadFileGet = (url, conf = {}) => {
    session = typeof window != 'undefined' ? JSON.parse(localStorage.getItem('current_user')) : null;
    config = {
        headers: {
            'X-fnb': session
        }
    }
    const responseType = 'blob'
    return axiosAPI.get(`${BASE_URL}/${url}`, { ...config, ...conf, responseType })
}

export const customPost = (url, data) => {
    session = typeof window != 'undefined' ? JSON.parse(localStorage.getItem('current_user')) : null;
    config = {
        headers: {
            'X-fnb': session
        }
    }
    return axiosAPI.post(url, data)
}