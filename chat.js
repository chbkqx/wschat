import { client } from "./client.js";
(()=>{
alert('b.js正常')
})();
function getPath() {
    const endpoint = client.defaults.baseURL || '';
    return endpoint.replace(/^https?/, 'wss') + '/chat';
}

function getToken() {
    const token = client.defaults.headers['Authorization'] || '';
    if (token.length > 0) {
        return token.replace(/^Bearer\s/, '').trim();
    }
    return 'anonymous';
}

class Chat {
    constructor(id = -1) {
        this.connection = undefined;
        this.id = id;
        this.state = false;
        this.callback = undefined;
        this.init();
    }

    init() {
        this.connection = new WebSocket(getPath());
        this.state = false;
        this.connection.onopen = () => {
            this.state = true;
            //alert(getToken()+this.id)
            this.send({
                token: getToken(),
                id: this.id
            });
        };
        this.connection.onclose = () => {
            this.state = false;
            setTimeout(() => {
                this.init();
            }, 3000);
        };
        this.connection.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.callback && this.callback(message);
        };
    }

    send(data) {
        if (!this.state || !this.connection) {
            return false;
        }
        this.connection.send(JSON.stringify(data));
        return true;
    }

    sendWithRetry(data) {
        if (!this.send(data)) {
            setTimeout(() => {
                this.sendWithRetry(data);
            }, 500);
        }
    }

    sendRequest(data) {
        this.sendWithRetry({
            message: data.message,
            model: data.model || 'gpt-3.5-turbo',
            web: data.web || false,
            type: 'chat'
        });
    }

    askStream(data, callback) {
        this.callback = callback;
        this.sendRequest(data);
    }

    async ask(data) {
        return new Promise((resolve) => {
            const response = { message: '', keyword: '', quota: 0 };
            this.askStream(data, (data) => {
                response.message += data.message;
                response.quota = data.quota;
                if (data.keyword.length > 0)
                    response.keyword = data.keyword;

                if (data.end)
                    resolve(response);
            });
        });
    }

    close() {
        if (!this.connection) return;
        this.connection.close();
    }
}
(()=>{
alert('b.js正常')
})();
export {Chat,getToken,getPath}