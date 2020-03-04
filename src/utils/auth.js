const tokenKey = 'admin_token'

export function setToken(token) {
  return localStorage.setItem(tokenKey, token)
}

export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function removeToken() {
  return localStorage.removeItem(tokenKey)
}

export default {
  setToken,
  getToken,
  removeToken
}