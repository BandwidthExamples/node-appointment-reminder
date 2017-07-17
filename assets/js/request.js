import Vue from 'vue'

let errorHandler = null;

function handleError(err) {
    if(errorHandler) {
        errorHandler(err);
    }
}

async function checkResponse(r) {
    if((r.headers.get('Content-Type') || '').indexOf('/json') >= 0) {
        const json = await r.json();
        if (json.error) {
            throw new Error(json.error);
        }
        return json;
    }
    if(!r.ok) {
        const message = await r.text();
        throw new Error(message || r.statusText);
    }
}

function wrappedFetch(path, options, context)
{
    Vue.set(context, 'inProgress', true)
    return fetch(path, options).then(r => {
        Vue.set(context, 'inProgress', false)
        return checkResponse(r)
    }, err => {
        Vue.set(context, 'inProgress', false)
        throw err
    });
}

export function postData(path, data, success = () => {}, context = {}) {
    const body = new FormData();
    Object.keys(data).forEach(key => {
        body.set(key, data[key]);
    });
    return wrappedFetch(path, {method: 'POST', body, credentials: 'same-origin'}, context).then(success).catch(err => handleError(err.message));
}

export function deleteData(path, success = () => {}, context = {}) {
    return wrappedFetch(path, {method: 'DELETE', credentials: 'same-origin'}, context).then(success).catch(err => handleError(err.message));
}

export function getData(path, success = () => {}, context = {}) {
    return wrappedFetch(path, {method: 'GET', credentials: 'same-origin'}, context).then(success).catch(err => handleError(err.message));
}

export function setErrorHandler(handler) {
    errorHandler = handler;
}
