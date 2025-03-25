export const FRONTEND_ORIGIN = window.location.host;
export const BACKEND_ORIGIN = FRONTEND_ORIGIN.indexOf('localhost') > -1 ? 'localhost:5000/api' : `${FRONTEND_ORIGIN}/api`;