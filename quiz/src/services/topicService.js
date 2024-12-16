import { get } from "../utils/request";

export const getListTopic = async () => {
    const result = await get(`topics`);
    return result;
};
