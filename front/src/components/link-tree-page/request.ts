import {getRequest} from "../../common/request/request.ts";
import {PathType} from "../common/types.ts";

export const getUrlOwner = (url_owner: string) =>
    getRequest<PathType>(`/path-profil/get-full-by-path/${url_owner}`);
