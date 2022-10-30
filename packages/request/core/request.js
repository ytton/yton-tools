import axios from 'axios';
import defaultConfig from './defaultConfig';
import { handleConfig, handleInterceptors, handleMethod } from './handles';

function createInstance(config) {
  handleConfig(config);
  let instance = axios.create(config);
  handleInterceptors(instance);
  handleMethod(instance);
  return instance;
}

const request = createInstance({ ...defaultConfig });
request.create = config => {
  return createInstance({ ...defaultConfig, ...config });
};
export default request;
export { request };
