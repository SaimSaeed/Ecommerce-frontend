export const BASE_URL = process.env.NODE_ENV === "development" ? 
"http://localhost:7000" : ""
// export const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const PRODUCTS_URL = "/api/products"
export const USERS_URL = "/api/user"
export const ORDERS_URL = "/api/order"
export const PAYPAL_URL = "/api/config/paypal"
export const UPLOAD_URL = "/api/upload"

