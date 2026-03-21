import {apiRoute} from "../../components/common/url.ts";

type HttpMethod = "DELETE" | "GET" | "PATCH" | "POST";
type RequestBody = FormData | object;
type RequestConfig = Omit<RequestInit, "body" | "headers" | "method"> & {
    headers?: HeadersInit;
};

export class HttpRequestError<TData = unknown> extends Error {
    readonly status: number;
    readonly data: TData | null;

    constructor(message: string, status: number, data: TData | null) {
        super(message);
        this.name = "HttpRequestError";
        this.status = status;
        this.data = data;
    }
}

const isJsonResponse = (response: Response) =>
    response.headers.get("content-type")?.includes("application/json");

const parseResponseBody = async (response: Response): Promise<unknown> => {
    if (response.status === 204) {
        return null;
    }

    if (isJsonResponse(response)) {
        return response.json();
    }

    const text = await response.text();
    return text.length > 0 ? text : null;
};

const createHeaders = (body: RequestBody | undefined, headers?: HeadersInit) => {
    const requestHeaders = new Headers(headers);
    const token = localStorage.getItem("token");

    if (!requestHeaders.has("Accept")) {
        requestHeaders.set("Accept", "application/json");
    }

    if (token && !requestHeaders.has("Authorization")) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    if (body && !(body instanceof FormData) && !requestHeaders.has("Content-Type")) {
        requestHeaders.set("Content-Type", "application/json;charset=UTF-8");
    }

    return requestHeaders;
};

const serializeBody = (body?: RequestBody) => {
    if (!body) {
        return undefined;
    }

    return body instanceof FormData ? body : JSON.stringify(body);
};

const request = async <TResponse>(
    url: string,
    method: HttpMethod,
    config?: RequestConfig,
    body?: RequestBody,
): Promise<TResponse> => {
    const response = await fetch(`${apiRoute}${url}`, {
        ...config,
        method,
        headers: createHeaders(body, config?.headers),
        body: serializeBody(body),
    });

    const data = await parseResponseBody(response);

    if (!response.ok) {
        throw new HttpRequestError(
            `HTTP ${response.status} ${response.statusText}`,
            response.status,
            data,
        );
    }

    return data as TResponse;
};

export const getRequest = <TResponse>(url: string, config?: RequestConfig) =>
    request<TResponse>(url, "GET", config);

export const postRequest = <TResponse, TBody extends RequestBody>(
    url: string,
    body: TBody,
    config?: RequestConfig,
) => request<TResponse>(url, "POST", config, body);

export const patchRequest = <TResponse, TBody extends RequestBody>(
    url: string,
    body: TBody,
    config?: RequestConfig,
) => request<TResponse>(url, "PATCH", config, body);

export const deleteRequest = <TResponse, TBody extends RequestBody | undefined = undefined>(
    url: string,
    body?: TBody,
    config?: RequestConfig,
) => request<TResponse>(url, "DELETE", config, body);

export const getRequestErrorMessage = (error: unknown, fallbackMessage: string) => {
    if (error instanceof HttpRequestError) {
        if (typeof error.data === "string" && error.data.trim().length > 0) {
            return error.data;
        }

        if (error.data && typeof error.data === "object") {
            const requestError = error.data as {error?: unknown; message?: unknown};
            const errorMessage = requestError.message ?? requestError.error;

            if (Array.isArray(errorMessage)) {
                return errorMessage.join(", ");
            }

            if (typeof errorMessage === "string" && errorMessage.trim().length > 0) {
                return errorMessage;
            }
        }
    }

    if (error instanceof Error && error.message.trim().length > 0) {
        return error.message;
    }

    return fallbackMessage;
};
