import { PrefixRestURL } from '../constant/Service';
import axios from 'axios';

const instance = axios.create({
  baseURL: PrefixRestURL,
  timeout: 60000,
});

export const SERVER_URL = 'http://109.14.20.45:6636/ux';
// const SERVER_URL = 'http://109.14.6.244:7777';

// 请求拦截器
instance.interceptors.request.use(
  config => {
    //{url: "/slides", method: "get", headers: {…}, baseURL: "http://api.hzwlb.org", transformRequest: Array(1), responseType: "json",…}
    return config;
  },
  error => {
    console.log('请求超时！');
    return Promise.reject(error);
  }
);
// 响应拦截器即异常处理，服务器 Response 对象
instance.interceptors.response.use(
  response => {
    // {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, request:{…}}
    const data = response.data; // 响应的数据部分(服务器返回部分)
    const status = response.status; // 标准状态码
    if (status === 200) {
      return Promise.resolve(data);
    } else {
      console.log('有错误错误发生,错误码:', status);
      return Promise.reject(response);
    }
  },
  error => {
    console.log('响应错误:', error.message);
    return Promise.reject(error.message);
  }
);

const api = {} as any;

api.get = function (method: string, data: any) {
  return new Promise((resolve, reject) => {
    instance
      .get(SERVER_URL + '/' + method + '?jsonString=' + encodeURIComponent(encodeURIComponent(JSON.stringify(data))))
      .then(response => {
        resolve({ ...response });
      })
      .catch(error => {
        reject(error);
      });
  });
};
export default api;
