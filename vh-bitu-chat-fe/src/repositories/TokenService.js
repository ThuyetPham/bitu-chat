import _ from 'lodash'
import Cookies from 'js-cookie'

const TOKEN_KEY = 'access_token'
const TOKEN_EXPIRED_DATE_KEY = 'token_expired_date'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'user'
const LANG_KEY = 'lang'
const PERMISSION_KEY = 'permissions'
const MODULE_KEY = 'module'

/**
 * Manage the how Access Tokens are being stored and received from cookie.
 *
 * Current implementation stores to cookies. Cookie should always be
 * accessed through this instance.
 * */
const TokenService = {
  getToken () {
    console.log( " TokenService.js", Cookies.get(TOKEN_KEY))
    return Cookies.get(TOKEN_KEY)
  },

  setToken (accessToken) {
    Cookies.set(TOKEN_KEY, accessToken, { expires: 60 })
  },

  removeToken () {
    Cookies.remove(TOKEN_KEY)
  },

  getLang () {
    return Cookies.get(LANG_KEY)
  },

  setLang (lang) {
    Cookies.set(LANG_KEY, lang)
  },
  setPermissions(permissions) {
    Cookies.set(PERMISSION_KEY, JSON.stringify(permissions))
  },
  getPermissions() {
    if (Cookies.get(PERMISSION_KEY)) return JSON.parse(Cookies.get(PERMISSION_KEY))
    return [];
  },
  removePermissions() {
    Cookies.remove(PERMISSION_KEY)
  },
  getUser () {
    if (Cookies.get(USER_KEY)) return JSON.parse(Cookies.get(USER_KEY))
    return {}
  },
  getId () {
    const user = this.getUser()
    return `${_.get(user, 'id')}`
  },
  getFullName () {
    const user = this.getUser()
    return `${_.get(user, 'lastName')} ${_.get(user, 'firstName')}`
  },
  getPosition () {
    const user = this.getUser()
    return _.get(user, 'position', '');
  },
  getAvatarPath () {
    const user = this.getUser()
    return _.get(user, 'avatar.filePath', null)
  },
  setUser (user) {
    Cookies.set(USER_KEY, JSON.stringify(user))
  },

  removeUser () {
    Cookies.remove(USER_KEY)
  },

  getTokenExpiredDate () {
    return Cookies.get(TOKEN_EXPIRED_DATE_KEY)
  },

  setTokenExpiredDate (expiredDate) {
    Cookies.set(TOKEN_EXPIRED_DATE_KEY, expiredDate)
  },

  removeTokenExpiredDate () {
    Cookies.remove(TOKEN_EXPIRED_DATE_KEY)
  },

  getRefreshToken () {
    return Cookies.get(REFRESH_TOKEN_KEY)
  },

  setRefreshToken (refreshToken) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 30 })
  },

  removeRefreshToken () {
    Cookies.remove(REFRESH_TOKEN_KEY)
  },
  getHeader () {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      'Accept-Language': this.getLang() || 'ja',
    }
  },
  getHeaderUpload () {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      'Accept-Language': this.getLang() || 'ja',
      'Content-Type': 'multipart/form-data',
    }
  },
  setModule(module) {
    Cookies.set(MODULE_KEY, JSON.stringify(module), { expires: 60 })
  },
  getModule() {
    if (Cookies.get(MODULE_KEY)) {
      return JSON.parse(Cookies.get(MODULE_KEY))
    }

    return {}
  },
  removeModule () {
    Cookies.remove(MODULE_KEY)
  },

  updateProfileInto (user) {
    if(user && user.id) {
        let userRole = {name: user.role.name, permissions: []};
        for(let i = 0; i < user.role.permissions.length; i++){
          if(user.role.permissions[i].model == 'search_all'){
            userRole.permissions.push(user.role.permissions[i]);
          }
        }
        this.setUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            avatar: user.avatar,
            ext: user.ext,
            extPassword: user.extPassword,
            position: user.position,
            departmentId: _.get(user,'department.id', ''),
            listDepartmentIds: user.listDepartment.map(item => item.id),
            callcenter_id: user.callcenter_id,
            role: userRole,
            departmentType: _.get(user, 'department.type', ''),
            isManager: _.get(user, 'isManager', ''),
            isCTV: _.get(user, 'isPartner', ''),
            typeId: _.get(user, 'typeId', ''),
            schoolLevelId: _.get(user, 'schoolLevelId', ''),
            isMarketing: _.get(user, 'isMarketing', '')
        })
        const permissions = _.get(user, 'role.permissions', []).map(p => `${p.model}_${p.action}`);
        this.setPermissions(permissions);
    }
  }
}

export default TokenService
