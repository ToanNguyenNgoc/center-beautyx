import axiosClient from "./axios";
import { AUTH_HEADER } from "./config_header";

class Media {
    postMedia = (formData: any) => {
        const url = `media`;
        return axiosClient.post(url, formData, AUTH_HEADER('multipart/form-data'))
    }
}
const mediaApi = new Media();
export default mediaApi