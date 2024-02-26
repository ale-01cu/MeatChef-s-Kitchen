// Server
export const PORT = 8000
export const BASE_URL = `http://localhost:${PORT}`
export const LOGIN_URL = `${BASE_URL}/login`
export const REGISTER_URL = `${BASE_URL}/register`
export const VERIFY_TOKEN_URL = `${BASE_URL}/verify-token`
export const MEATS_URL = `${BASE_URL}/meat-products`
export const fILTER_MEATS_BY_CATEGORIES_URL = `${MEATS_URL}/category`
export const COURSES_URL = `${BASE_URL}/course`
export const CATEGORIES_URL = `${BASE_URL}/category`
export const IS_TEACHER_URL = `${BASE_URL}/is-teacher`
export const USER_URL = `${BASE_URL}/user`

export const TOKEN = "token"

// Client
export const CLIENT_PORT = 5173
export const CLIENT_BASE_URL = `http://localhost:${CLIENT_PORT}`
export const CLIENT_CATEGORY_URL = `${CLIENT_BASE_URL}/carnicos`

