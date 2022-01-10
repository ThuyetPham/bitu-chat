import axios from 'axios'
import _ from 'lodash'
import TokenService from '../helpers/token'

const resource = `${process.env.VUE_APP_API}`;

const genParams = (params) => {
    let paramStr = '?';

    for (const property in params) {
        paramStr += `${property}=${params[property]}&`;
    }

    return paramStr;
};

const STATUS_CODE_FORBIDDEN = 403
const STATUS_SUCCESS = 200
const STATUS_INTERNAL_SERVER_ERROR = 500

const baseUrl = process.env.VUE_APP_BASE_URL
const apiUrl = process.env.VUE_APP_API
const options = {
  baseURL: baseUrl,
  apiURL:apiUrl
}


class ApiService {
    axiosInstance;

    constructor() {
        this.initAxiosInstance()
    }

    initAxiosInstance() {
        if (TokenService.getToken() !== null) {
            options.headers = {
                Authorization: `Bearer ${TokenService.getToken()}`,
                Language: _.get(TokenService.getLang(), '', 'en'),
            }
        }
        this.axiosInstance = axios.create(options)
        this.axiosInstance.interceptors.response.use(
            async (response) => {
              const statusCode = _.get(response, 'data.code', STATUS_INTERNAL_SERVER_ERROR)
              if (statusCode === STATUS_SUCCESS) {
                return {
                  success: true,
                  data: _.get(response, 'data.data', []),
                  currentTime: _.get(response, 'data.time_current', null),
                  totalItem: _.get(response, 'data.totalItem', null),
                  message: _.get(response, 'data.message', null)
                }
              }

              if (statusCode === STATUS_CODE_FORBIDDEN) {
                window.location.href = '/error-403'
              }

              return {
                error: true,
                message: _.get(response, 'data.message', ''),
                status: _.get(response, 'data.code', STATUS_INTERNAL_SERVER_ERROR),
                errors: _.get(response, 'data.errors', []),
                data:_.get(response,'data.data',[])
              }
            },

            async (error) => {
              if (error.response) {
                return {
                  error: true,
                  status: STATUS_INTERNAL_SERVER_ERROR,
                  message: _.get(error, 'message', ''),
                  errors: _.get(error, 'response.data', {}),
                  data:_.get(error,'data',[])
                }
              } if (error.request) {
                return {
                  error: true,
                  status: STATUS_INTERNAL_SERVER_ERROR,
                  message: _.get(error, 'message', ''),
                  errors: _.get(error, 'request', {}),
                }
              }
              return {
                error: true,
                status: STATUS_INTERNAL_SERVER_ERROR,
                message: _.get(error, 'message', ''),
              }
            }
            ,
        )
    }

    get(apiUrl, params) {
        return this.axiosInstance.get(`${resource}${apiUrl}${genParams(params)}`)
    }

    post(apiUrl, body) {
        return this.axiosInstance.post(`${resource}${apiUrl}`, body)
    }

    put(apiUrl, body) {
        return this.axiosInstance.patch(`${resource}/${apiUrl}`, body)
    }

    delete(apiUrl) {
        return this.axiosInstance.delete(`${resource}/${apiUrl}`)
    }
}

export default ApiService;
