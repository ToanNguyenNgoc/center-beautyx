import axiosClient from "./axios";
import { AUTH_HEADER } from "./config_header";

class Media {
    postMedia = (formData: FormData) => {
        const url = `media`;
        return axiosClient.post(url, formData, AUTH_HEADER('multipart/form-data'))
    }
}
export const mediaApi = new Media();
export default mediaApi