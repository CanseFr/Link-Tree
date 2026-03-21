const defaultApiRoute = "http://localhost:3000";

export const apiRoute = import.meta.env.VITE_API_ROUTE?.trim() || defaultApiRoute;
