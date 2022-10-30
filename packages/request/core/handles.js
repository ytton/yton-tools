import defaultConfig from './defaultConfig';

export function handleMessage(errorPromise, extra) {
  const { needMessage, message, returnType } = extra;
  return new Promise((res, rej) => {
    errorPromise.then(res, error => {
      let msg = '';
      if (typeof error === 'string') {
        msg = error;
      } else if (typeof error === 'object' && 'message' in error) {
        msg = error.message;
      }
      needMessage && message.error(msg);
      if (returnType === 'withError') {
        return res([error, undefined]);
      }
      rej(error);
    });
  });
}
export function formatKey(key, isMethod) {
  if (/^handle/.test(key)) {
    return `handle${isMethod ? 'Method' : ''}${key.replace('handle', '')}`;
  }
  return key;
}
export function handleConfig(config) {
  config.extra = {};
  Object.keys(defaultConfig).forEach(extraKey => {
    if (extraKey in config) {
      config.extra[formatKey(extraKey, config.__isMethod)] = config[extraKey];
      delete config[extraKey];
    }
  });
  config.__isMethod && delete config.__isMethod;
}
export function handleInterceptors(instance) {
  instance.interceptors.request.use(
    config => {
      const extra = { ...instance.defaults.extra, ...(config.extra ?? defaultConfig) };
      try {
        //全局统一处理请求
        //拷贝一份全局处理之前
        const beforeConfig = JSON.parse(JSON.stringify(config));
        config = extra.handleRequest(config) ?? config;
        //方法局部处理请求
        config = extra.handleMethodRequest(config, beforeConfig) ?? config;
        //处理token
        extra.needToken && (config = extra.handleAuth(config) ?? config);
        return config;
      } catch (error) {
        return handleMessage(extra.handleError(error, config), extra);
      }
    },
    error => {
      const extra = error?.config?.extra;
      let errorPromise = extra ? extra.handleError(error) : Promise.reject(error);
      return handleMessage(errorPromise, extra);
    }
  );

  instance.interceptors.response.use(
    response => {
      const extra = { ...instance.defaults.extra, ...(response.config.extra ?? defaultConfig) };
      try {
        //全局统一处理响应
        //拷贝一份全局处理前的response
        const beforeResponse = JSON.parse(JSON.stringify(response));
        response = extra.handleResponse(response) ?? response;
        //方法局部处理响应
        response = extra.handleMethodResponse(response, beforeResponse) ?? response;
        if (extra.returnType === 'withError') {
          response = [undefined, response];
        }
        return response;
      } catch (error) {
        return handleMessage(extra.handleError(error, response), extra);
      }
    },
    error => {
      const extra = error?.config?.extra;
      let errorPromise = extra ? extra.handleError(error) : Promise.reject(error);
      return handleMessage(errorPromise, extra);
    }
  );
}
export function handleMethod(instance) {
  const _request = instance.request;
  function request(configOrUrl, config) {
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config.__isMethod = true;
    handleConfig(config);
    return _request.call(instance, config);
  }
  instance.request = request;

  ['delete', 'get', 'head', 'options'].forEach(function (method) {
    instance[method] = function (url, config) {
      return this.request({
        ...(config || {}),
        ...{
          method,
          url,
          data: (config || {}).data
        }
      });
    };
  });

  ['post', 'put', 'patch'].forEach(function (method) {
    function generateHTTPMethod(isForm = false) {
      return function httpMethod(url, data, config) {
        return instance.request({
          ...(config || {}),
          ...{
            method,
            headers: isForm
              ? {
                  'Content-Type': 'multipart/form-data'
                }
              : {},
            url,
            data
          }
        });
      };
    }

    instance[method] = generateHTTPMethod();

    instance[method + 'Form'] = generateHTTPMethod(true);
  });
}
