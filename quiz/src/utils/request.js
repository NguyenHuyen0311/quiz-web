const API_DOMAIN = "http://localhost:3001/";

export const get = async (patch) => {
    const response = await fetch(API_DOMAIN + patch);
    const result = await response.json();
    return result;
};

export const post = async (patch, options) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
      });
    const result = await response.json();
    return result;
};

export const del = async (patch) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "DELETE"
    });
    const result = await response.json();
    return result;   
};

export const patch = async (patch, options) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
      });
      const result = await response.json();
      return result;
};