import Repository from './Repository'

class AuthService {
    resource = process.env.VUE_APP_API_LOGIN;

    async login(payload) {
        return await Repository.post(`${this.resource}`, payload)
    }
}

const authService = new AuthService;
export { authService };
export default AuthService;
