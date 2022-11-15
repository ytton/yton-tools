import axios from 'axios';
import defaultConfig from './defaultConfig';
import { handleConfig, handleInterceptors, handleMethod } from './handles';
import { YtRequestConfig, YtRequestStatic, type YtRequestInstance } from '../types/';
function createInstance(config: YtRequestConfig): YtRequestInstance {
  handleConfig(config);
  let instance = axios.create(config);
  handleInterceptors(instance);
  handleMethod(instance);
  return instance;
}

axios.create({});
const request = createInstance({ ...defaultConfig });
const staticInstance: YtRequestStatic = {
  ...request,
  ...{
    create(config) {
      return createInstance({ ...defaultConfig, ...config });
    }
  }
};

export default staticInstance;
export { staticInstance as request };
