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
