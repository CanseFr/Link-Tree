import axios from "axios";
import { RegisterObject } from "./type";

export const register = async (registerObject: RegisterObject) => {
    const formData = new FormData();

    formData.append("firstname", registerObject.firstname!);
    formData.append("lastname", registerObject.lastname!);
    formData.append("email", registerObject.email!);
    formData.append("password", registerObject.password!);

    if (registerObject.avatar) {
        formData.append("avatar", registerObject.avatar);
    }

    const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
    );

    return response.data;
};
