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
    method: "GET"
  })
}

/**
 * 用户注册
 * @param {*} data 
 * @returns 
 */
export const register = (data) => {
  return request({
    url: "/user/register",
    method: "POST",
    data
  })
}

/**
 * 检查用户名是否可用
 * @param username 用户名
 * @returns {AxiosPromise}
 */
export const checkUserName = (username) => {
  return request({
    url: `/user/check_user_name/${username}`,
    method: "GET"
  })
}

/**
 * 获取登录的用户的信息
 * @returns {AxiosPromise}
 */
export const getUserInfo = () => {
  return request({
    url: "/user/info",
    method: "GET"
  })
}

/**
 * 更新用户信息
 * @param data
 * @returns {AxiosPromise}
 */
export const updateUserInfo = (data) => {
  return request({
    url: "/user/update",
    method: "PUT",
    data
  })
}

/**
 * 充值
 * @param {*} data 
 * @returns 
 */
export const addUserPrice = (data) => {
  return request({
    url: "/user/charge",
    method: "POST",
    data
  })
}


/**
 * 门票列表
 * @param {*} params 
 * @returns 
 */
export const ticketList = (params) => {
  return request({
    url: "/ticket/list",
    method: "GET",
    params
  })
}
