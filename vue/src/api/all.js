// src/api/index.js
import axiosInstance from './axios'; // 使用配置了拦截器的 Axios 实例

const api = import.meta.env.VITE_API_URL;
if (!api) {
  console.error('VITE_API_URL is not defined in the environment variables.');
}

const apiMethods = {
  // 获取今天的订单客户
  webNxDisGetTodayOrderCustomer(disId) {
    return axiosInstance.get(`nxdepartmentorders/webNxDisGetTodayOrderCustomer/${disId}`);
  },

  webNxDisGetTodayReturnCustomer(data) {
    return axiosInstance.get(`nxdepartmentorders/webNxDisGetTodayReturnCustomer/${data}`);
  },

  // 获取待打印的部门订单
  disGetToFillDepOrders(data) {
    return axiosInstance.post('/nxdepartmentorders/printerGetPrintOrders', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },

  disGetToFillDepOrdersReturn(data) {
    return axiosInstance.post('nxdepartmentorders/getToFillDepOrdersReturn', data);
  },

  webGetOrderPageSubDep(data) {
    return axiosInstance.post('nxdepartmentorders/webGetSubDepOrderPageSubDep', data);
  },

  webGetOrderPageSubDepRetrun(data) {
    return axiosInstance.post('nxdepartmentorders/webGetSubDepOrderPageSubDepReturn', data);
  },

  webGetOrderPage(data) {
    return axiosInstance.post('nxdepartmentorders/webGetSubDepOrderPage', data);
  },

  webGetOrderPageReturn(data) {
    return axiosInstance.post('nxdepartmentorders/webGetSubDepOrderPageReturn', data);
  },

  saveToFillPriceOrder(data) {
    return axiosInstance.post('nxdepartmentorders/giveOrderPrice', data);
  },

  giveOrderWeight(data) {
    return axiosInstance.post('nxdepartmentorders/giveOrderWeight', data);
  },

  // 保存账户账单
  saveAccountBill(data) {
    return axiosInstance.get(`nxdepartmentbill/saveAccountBillPrinter/${data}`);
  },

  saveAccountReturnBill(data) {
    return axiosInstance.post('nxdepartmentbill/saveAccountReturnBill', data);
  },

  /**
   * 检查登录状态，不显示遮盖层
   * @param {String} sessionId - 会话ID
   * @param {Object} config - Axios 配置选项（可选）
   * @returns {Promise} Axios 请求的 Promise
   */
  checkLoginStatus(sessionId, config = {}) {
    return axiosInstance.get(`nxdistributeruser/checkLoginStatus/${sessionId}`, config);
  },
  
  // 其他 API 方法
};

export default apiMethods;
