import QueryString from 'query-string';
import * as consts from "../constants/index"

export const getHosts = async (offset = 0, limit = 50) => {
    return await get(consts.getHosts, {
        offset: offset, limit: limit,
    })
}

export const getDoms = async (offset = 0, limit = 50) => {
    return await get(consts.getDoms, {
        offset: offset, limit: limit
    })
}

export const getDom = async (id) => {
    return await get(consts.getDom, {
        id: id
    })
}

export const getRoomsByDomId = async (offset = 0, limit = 50, domId) => {
    return await get(consts.getRoomByDomId, {
        offset: offset,
        limit: limit,
        doom_id: domId
    })
}

export const getContracts = async (offset = 0, limit = 50) => {
    return await get(consts.getContracts, {
        offset: offset, limit: limit
    })
}

export const getRooms = async (offset = 0, limit = 50) => {
    return await get(consts.getRooms, {
        offset: offset, limit: limit
    })
}

const defaultHeaders = {
    Accept: 'application/json', 'Content-Type': 'application/json',
};

const request = async (url, method, body, customHeaders = {}) => {
    let endpoint = url;
    if (!url.startsWith('http')) {
        endpoint = config.apiUrl + url;
    }
    const headers = {
        ...defaultHeaders, ...customHeaders,
    };

    const fetchOpts = {
        method, headers,
    };

    if (method !== 'HEAD' && method !== 'GET') {
        if (headers['Content-Type'] === 'application/json') {
            fetchOpts.body = JSON.stringify(body);
        } else {
            delete headers['Content-Type'];
            fetchOpts.body = body;
        }
    }

    const start = Date.now();
    const response = await fetch(endpoint, fetchOpts);
    const end = Date.now();
    const responseTime = end - start;

    const json = await response.json();

    const logData = {
        method, url: endpoint, status: response.status, responseTime,
    };

    if (response.status < 200 || response.status >= 300) {
        if (json) {
            logData.error = json;
            console.log(json, response.status)
        } else {
            logData.error = response.statusText;
            console.log(json, response.status)
        }
    }

    return json;
};

export const get = (endpoint, params, headers = {}) => {
    let url = endpoint;
    if (params) {
        url += `?${QueryString.stringify(params)}`;
    }
    return request(url, 'GET', null, headers);
};

export const post = (endpoint, body, headers = {}) => (request(endpoint, 'POST', body, headers));

export const put = (endpoint, body, headers = {}) => (request(endpoint, 'PUT', body, headers));

export const del = (endpoint, body, headers = {}) => (request(endpoint, 'DELETE', body, headers));
