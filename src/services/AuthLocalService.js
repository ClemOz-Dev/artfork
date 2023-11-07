import cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import AuthApiService from "./api/AuthApiService.js"
import store from "../store/index.js"

class AuthLocalService {
  static jwt = "ARTBOOK_TOKEN"

  static getJwt() {
    return cookies.get(this.jwt)
  }

  static setJwt(token) {
    cookies.set(this.jwt, token)
  }

  static async deleteJwt() {
    await cookies.remove(this.jwt)
  }

  static tokenExpireIn(token) {
    const expiration = jwtDecode(token).exp

    if (expiration === undefined || expiration === null) {
      return -1
    }
    const now = Date.now() / 1000
    return expiration - now
  }

  static async isTokenExpired() {
    const token = await this.getJwt()
    if (token === undefined) {
      return true
    }
    return this.tokenExpireIn(token) <= 0
  }

  static async checkToken() {
    if (await this.isTokenExpired()) {
      return
    }
    try {
      await AuthApiService.fetchCurrentUser()
      await store.commit("authStore/SET_CONNECTED", true)
    } catch (e) {
      console.error(e.toString())
    }
  }
}

export default AuthLocalService
