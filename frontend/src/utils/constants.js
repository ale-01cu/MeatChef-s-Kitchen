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
export const LIST_USERS_URL = `${BASE_URL}/users`
export const UPDATE_USER_BY_ADMIN_URL = `${BASE_URL}/user-full`
export const SEARCH_USERS_URL = `${BASE_URL}/search-users`
export const ORDER_URL = `${BASE_URL}/order`
export const STANDARD_ORDER_URL = `${BASE_URL}/standard-order`
export const CUSTOM_ORDER_URL = `${BASE_URL}/custom-order`
export const AVATAR_URL = `${BASE_URL}/update-avatar`
export const GET_MOST_SELLED_PRODUCT_URL = `${BASE_URL}/most-selled-product`
export const LIST_BIGGEST_BUYERS_URL = `${BASE_URL}/list-biggest-buyers`
export const COURSE_VIDEO_PLAY_URL = `${COURSES_URL}/play`

export const TOKEN = "token"

// Client
export const CLIENT_PORT = 5173
export const CLIENT_BASE_URL = `http://localhost:${CLIENT_PORT}`
export const CLIENT_CATEGORY_URL = `${CLIENT_BASE_URL}/carnicos`

