function handleAuth(config) {
  return config;
}
function handleRequest(config) {
  return config;
}
function handleMethodRequest(response) {
  return response;
}
function handleResponse(response) {
  return response;
}
function handleMethodResponse(response) {
  return response;
}
function handleError(error) {
  return Promise.reject(error);
}
function console(message) {
  if (typeof message === 'string') {
    console.log(message);
  } else {
    console[message.type](message.message);
  }
}
console.info = message => console({ type: 'info', message });
console.log = message => console({ type: 'log', message });
console.error = message => console({ type: 'error', message });
console.warn = message => console({ type: 'warn', message });

export const defaultConfig = {
  needAuth: false,
  needMessage: false,
  message: console,
  returnType: 'promise', //'withError'
  handleAuth,
  handleRequest,
  handleMethodRequest,
  handleResponse,
  handleMethodResponse,
  handleError
};
export default defaultConfig;
