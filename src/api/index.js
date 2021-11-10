import request from "@/utils/request";

/**
 *  用户登录
 * @param {username: 用户名, password: 密码} data
 * @returns 登录状态
 */
export const login = (data) => {
  return request({
    url: "/user/login",
    method: "POST",
    data,
  });
};

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return request({
    url: "/user/logout",
    method: "GET",
  });
};

/**
 * 用户注册
 * @param {*} data
 * @returns
 */
export const register = (data) => {
  return request({
    url: "/user/register",
    method: "POST",
    data,
  });
};

/**
 * 检查用户名是否可用
 * @param username 用户名
 * @returns {AxiosPromise}
 */
export const checkUserName = (username) => {
  return request({
    url: `/user/check_user_name/${username}`,
    method: "GET",
  });
};

/**
 * 获取登录的用户的信息
 * @returns {AxiosPromise}
 */
export const getUserInfo = () => {
  return request({
    url: "/user/info",
    method: "GET",
  });
};

/**
 * 更新用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export const updateUserInfo = (data) => {
  return request({
    url: "/user/update",
    method: "PUT",
    data,
  });
};

/**
 * 充值
 * @param {*} data
 * @returns
 */
export const addUserPrice = (data) => {
  return request({
    url: "/user/charge",
    method: "POST",
    data,
  });
};

/**
 * 门票列表
 * @param {*} params
 * @returns
 */
export const ticketList = (params) => {
  return request({
    url: "/ticket/list",
    method: "GET",
    params,
  });
};

export const addTicket = (data) => {
  return request({
    url: "/ticket",
    method: "POST",
    data,
  });
};

/**
 * 查看演唱会门票详情
 *
 * @param {演唱会门票id}} id
 * @returns
 */
export const ticketDetail = (id) => {
  return request({
    url: `/ticket/${id}`,
    method: "GET",
  });
};

/**
 * 下单购票
 * @param {门票id}} data
 * @returns
 */
export const buyTicket = (data) => {
  return request({
    url: "/order/buy",
    method: "POST",
    data,
  });
};

export const myOrder = () => {
  return request({
    url: "/order/list",
    method: "GET",
  });
};

export const userList = (params) => {
  return request({
    url: "/user/list",
    method: "GET",
    params,
  });
};

export const userDelete = (id) => {
  return request({
    url: `/user/${id}`,
    method: "DELETE",
  });
};

export const sysCount = () => {
  return request({
    url: "/order/count",
    method: "GET",
  });
};

export const ticketDelete = (id) => {
  return request({
    url: `/ticket/${id}`,
    method: "DELETE",
  });
};

export const setAdmin = (id) => {
  return request({
    url: `/user/changeUser/${id}`,
    method: "GET",
  });
};

export const bannerList = () => {
  return request({
    url: `/banner/list`,
    method: "GET",
  });
};

export const deleteUrl = (id) => {
  return request({
    url: `/banner/${id}`,
    method: "DELETE",
  });
};

export const addUrl = (data) => {
  return request({
    url: "/banner",
    method: "POST",
    data,
  });
};
