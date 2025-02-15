const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;

const API_BASE_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api/v1`;
export const WEBSOCKET_URL = `ws://${BACKEND_HOST}:${BACKEND_PORT}/ws`;

export default API_BASE_URL;