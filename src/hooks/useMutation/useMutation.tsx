import axios from "axios";

export const useMutation = (base_url) => {
  const mutation = async (url, method, params) => {
    if (method === "get") {
      return await get(url, params);
    }
  };

  const get = async (url, params) => {
    const response = await console.log("ressss");
    return response.data;
  };

  return [mutation];
};
