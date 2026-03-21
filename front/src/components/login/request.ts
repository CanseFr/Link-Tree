import {postRequest} from "../../common/request/request.ts";
import {LoginObject} from "./type.ts";

export interface LoginResponse {
    accessToken: string;
    lightInfo: {
        firstname: string;
        pictureUrl?: string;
    };
}

export const login = (loginObject: LoginObject) =>
    postRequest<LoginResponse, LoginObject>("/auth/login", loginObject);
