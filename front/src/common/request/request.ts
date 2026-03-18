import {apiRoute} from "../../components/common/url.ts";

export const genericFetchWithBody = <T>(url: string, methods: 'POST' | 'GET' | 'DELETE' | 'PATCH', object: T): Promise<Response> => {
    const isFormData = object instanceof FormData;

    return fetch(apiRoute + url, {
        method: methods,
        headers: isFormData ? {} : {"Content-Type": "application/json;charset=UTF-8"},
        body: isFormData ? object : JSON.stringify(object),
    })
}

export const genericFetchWithUrl = (url: string, methods: 'POST' | 'GET' | 'DELETE' | 'PATCH'): Promise<Response> => {
    return fetch(apiRoute + url, {
        method: methods,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })
}
