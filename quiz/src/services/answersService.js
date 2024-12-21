import { get } from "../utils/request";
import { getCookie } from "../helpers/cookie";

export const getAnswersByUserId = async () => {
    const userId = getCookie("id");
    const result = await get(`answers?userId=${userId}`);
    return result;
};

export const getAnswer = async (id) => {
    const result = await get(`answers/${id}`);
    return result;
};