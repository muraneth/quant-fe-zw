import fetch from "isomorphic-fetch";
import { getUserInfo } from "@/utils/common";
import { serverUrl } from "@/constants/common";

interface IFetchParams {
  url: string;
  method: "GET" | "POST";
  params?: Record<string, any>;
}

enum ResponseCode {
  // 成功
  SUCCESS = 0,
  NOT_SIGN_IN_1 = 1008,
  // 未登录
  NOT_SIGN_IN_2 = 1009,
  // token 校验失败
  TOKEN_ERROR = 1010,
  // 无权限
  NO_PERMISSION = 3025,
}

const envMode = import.meta.env.MODE;

const request = ({ url, method, params = {} }: IFetchParams) => {
  const urlMap = {
    GET: `${serverUrl[envMode]}${url}?${new URLSearchParams(
      params
    ).toString()}`,
    POST: `${serverUrl[envMode]}${url}`,
  };

  const bodyMap = {
    GET: undefined,
    POST: JSON.stringify(params),
  };

  const { token, uid } = getUserInfo();
  const fetchHeaders = {
    "content-type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Authorization: token,
    Uid: uid,
  };

  return fetch(urlMap[method], {
    method,
    credentials: "same-origin",
    body: bodyMap[method],
    headers: fetchHeaders,
  })
    .then((res) => res.json())
    .then((res) => {
      switch (res.code) {
        case ResponseCode.NO_PERMISSION:
        case ResponseCode.SUCCESS:
          return Promise.resolve(res.data);
        case ResponseCode.NOT_SIGN_IN_1:
        case ResponseCode.NOT_SIGN_IN_2:
        case ResponseCode.TOKEN_ERROR:
          window.location.href = "/sign-in";
          return Promise.reject();
      }
      return Promise.reject(res.msg || 'fetch error');
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { request };
