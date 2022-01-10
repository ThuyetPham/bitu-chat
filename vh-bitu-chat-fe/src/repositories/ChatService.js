import ApiService from './ApiService';
import chatData from './mockData/chatData'

class ChatService extends ApiService {
    resource = '/conversation';

    getListUsers(path = null, params = {}) {
        // const url = path ? `${this.resource}/${path}` : `${this.resource} `;

        // return this.get(url, params);
        console.log('log for variables not used', path, params);
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve(chatData);
            }, 300);
        });

        return promise;
    }

    getListMessage(path = null, params = {}) {
        // const url = path ? `${this.resource}/${path}` : `${this.resource} `;

        // return this.get(url, params);
        console.log('log for variables not used', path, params);
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                const item = chatData.data.data.filter((item) => item.id === path);
                resolve(item[0].messages);
            }, 300);
        });

        return promise;
    }

    getConversation(params) {
        // const resource = `${Repository.defaults.apiURL}`;
        // return Repository.get(`${resource}${this.resource}/list`)
       
        return this.get(`${this.resource}/list`, params);
    }
    getConvMessage(id, params) {
        return this.get(`${this.resource}/${id}`, params);
    }
}

const chatService = new ChatService;
export { chatService };
export default ChatService;
