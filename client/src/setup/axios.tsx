import axious from "axios";

// console.log(`Env base url: ${import.meta.env["VITE_API_DOMAIN"]}`);

const api = axious.create({
    baseURL: `${import.meta.env["VITE_API_DOMAIN"]}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export { api };
