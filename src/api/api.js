import request from "@/utils/request";

const csrf = params => {
  return request({
    url: "/sanctum/csrf-cookie",
    method: "get",
  });
};

export const login = async params => {
  await csrf();
  return request({
    url: "/login",
    method: "post",
    data: params,
  });
};

export const getUser = () => {
  return request({
    url: "/api/user",
    method: "get",
  });
};

export const getList = () => {
  return request({
    url: "/api/list",
    method: "get",
  });
};
