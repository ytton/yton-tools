import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ExtraConfig = {
  needAuth: boolean;
  needMessage: boolean;
  message: Message;
  returnType: 'promise' | 'withError';
  __isMethod: boolean;
  handleAuth: <D>(config: YtRequestConfig<D>) => YtRequestConfig<D>;
  handleRequest: <D>(config: YtRequestConfig<D>) => YtRequestConfig<D>;
  handleMethodRequest: <D>(config: YtRequestConfig<D>) => YtRequestConfig<D>;
  handleResponse: <D>(config: YtRequestConfig<D>) => YtRequestConfig<D>;
  handleMethodResponse: <D>(config: YtRequestConfig<D>) => YtRequestConfig<D>;
  handleError: <D>(config: YtRequestConfig<D>) => YtRequestConfig<D>;
};
export type YtRequestConfig<D = any> = AxiosRequestConfig<D> & Partial<ExtraConfig>;
export type YtRequestInstance = {
  create?: (config: YtRequestConfig) => YtRequestInstance;
  request<T = any, R = AxiosResponse<T>, D = any>(config: YtRequestConfig<D>): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: YtRequestConfig<D>): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
};

export interface Message {
  (message: string): void;
  (messageType: { type: 'log' | 'info' | 'warn' | 'error'; message: string }): void;
  log(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
export function sum(a: number, b: number): number;
export function times(a: number, b: number): number;
declare const request: YtRequestInstance;
export { request };
