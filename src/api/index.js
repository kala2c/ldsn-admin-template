// import { request } from './request'
import Request from './request'
let request = Request.request
let domain = '/'
// let domain = 'http://127.0.0.1:3000/'

const login = query => { return request(query, domain + 'api/admin/login', 'POST') }
const getUserInfo = query => { return request(query, domain + 'api/admin/user') }



export default {
  login,
  getUserInfo
}