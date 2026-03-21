import { RegisterObject } from "./type";
import {postRequest} from "../../common/request/request.ts";

export const register = async (registerObject: RegisterObject) => {
    const formData = new FormData();

    formData.append("firstname", registerObject.firstname!);
    formData.append("lastname", registerObject.lastname!);
    formData.append("email", registerObject.email!);
    formData.append("password", registerObject.password!);

    if (registerObject.avatar) {
        formData.append("avatar", registerObject.avatar);
    }

    return postRequest("/auth/register", formData);
};
