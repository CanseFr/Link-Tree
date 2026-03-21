import {getRequest} from "../../../common/request/request.ts";
import {userType} from "./types.ts";

export const getUsers = () => getRequest<userType[]>(`/users`);
