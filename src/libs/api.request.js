import Axios from 'axios/index';
import { localI18n } from './tools';
import { Toast } from 'antd-mobile';
import ServerBaseUrl from '../config';

class HttpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    };
    // 存储请求队列
    this.queue = {};
  }

  // 销毁请求实例
  destroy (url) {
    delete this.queue[url];
    const queue = Object.keys(this.queue);
    return queue.length
  }

  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    });

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let { data, config: { url } } = res;
      const is = this.destroy(url);
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }

      // check success & message
      data.success = 'success' in data ? data.success : data.flag === 'S';
      data.message = 'message' in data ? data.message : data.msg;

      if (!data.success) {
        if (data.message) Toast.info(data.message);
        return false
      }
      return data
    }, (error) => {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  // 创建实例
  static create (config) {
    let conf = {
      baseURL: ServerBaseUrl['H5BaseUrl'],
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...config,
    };
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }

  // 请求实例
  request (options, config) {
    let instance = HttpRequest.create(config);
    this.interceptors(instance, options.url);
    options = { ...options,  data: { ...options.data, language: localI18n() } };
    this.queue[options.url] = instance;
    return instance(options)
  }
}

const axios = new HttpRequest();

export default axios;
