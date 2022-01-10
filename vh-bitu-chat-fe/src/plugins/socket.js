import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import TokenService from '../helpers/token'

class SocketService {
  initSocket() {
    const socket = io(process.env.VUE_APP_SOCKET_URL, {
      forceNew: true,
      transports: ['websocket'],
      query: {
        accessToken: `Bearer ${TokenService.getToken()}`,
      },
    });
    
    const vueSocketIO = new VueSocketIO({
        debug: true,
        connection: socket,
    })

    Vue.use(vueSocketIO)
  }
}

const socketService = new SocketService
export { socketService }
export default SocketService
