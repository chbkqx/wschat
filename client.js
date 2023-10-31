export const client = axios.create({
  baseURL: 'https://api.chatnio.net',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export function setKey(key) {
  client.defaults.headers['Authorization'] = `Bearer ${key}`;
}

export function setEndpoint(url) {
  client.defaults.baseURL = url;
}