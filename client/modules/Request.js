import axios from 'axios';
import qs from 'qs';
import History from './History';

const client = () => {
    const defaults = {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    };

    axios.interceptors.response.use(response => response, (error) => {
        if (error.response.status === 400 || error.response.status === 404) {
            History.push('/404');
        }

        return Promise.reject(error.response);
    });

    return {
        get: (url, props = {}) => axios.get(url, { ...defaults, ...props }),
        post: (url, data, props = {}) => axios.post(url, qs.stringify(data), { ...defaults, ...props }),
        put: (url, data, props = {}) => axios.put(url, qs.stringify(data), { ...defaults, ...props }),
        delete: (url, props = {}) => axios.delete(url, { ...defaults, ...props }),
    };
};

const request = client();

export default request;
