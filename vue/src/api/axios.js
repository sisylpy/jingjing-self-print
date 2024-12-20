// src/api/axios.js
import axios from 'axios';
import store from '../store'; // 引入 Vuex Store


// 获取环境变量中的 API 地址
const apiUrl = import.meta.env.VITE_API_URL;

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: apiUrl, // 使用环境变量作为 baseURL
  // 其他配置（如超时、请求头等）
  timeout: 10000, // 设置请求超时为10秒
  headers: {
    'Content-Type': 'application/json',
    // 其他头部配置
  },
});


// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('发送请求:', config);
    console.log('发送请求showLoadingshowLoading:', config);
    // 检查请求配置中是否明确设置了 showLoading 为 false
    if (config.showLoading !== false) {
      store.dispatch('setLoading', true); // 显示遮盖层
    }
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    // store.dispatch('setLoading', false); // 隐藏遮盖层
    
    if (error.config && error.config.showLoading !== false) {
      store.dispatch('setLoading', false); // 隐藏遮盖层
    }
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('接收响应:', response);
    // store.dispatch('setLoading', false); // 隐藏遮盖层
     // 检查请求配置中是否明确设置了 showLoading 为 false
     if (response.config.showLoading !== false) {
      store.dispatch('setLoading', false); // 隐藏遮盖层
    }
    return response;
  },
  (error) => {
    console.error('响应错误:', error);
    // store.dispatch('setLoading', false); // 隐藏遮盖层
    if (error.config && error.config.showLoading !== false) {
      store.dispatch('setLoading', false); // 隐藏遮盖层
    }
    return Promise.reject(error);
  }
);




export default axiosInstance;
