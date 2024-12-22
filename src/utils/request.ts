import fetch from "isomorphic-fetch";
import { getUserInfo } from "@/utils/common";
import { setAuth } from "@/utils/common";

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
  // 无 level 权限
  NO_LEVEL_AUTH = 3026,
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const request = ({ url, method, params = {} }: IFetchParams) => {
  const urlMap = {
    GET: `${serverUrl}${url}?${new URLSearchParams(params).toString()}`,
    POST: `${serverUrl}${url}`,
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
          setAuth({ indicatorLevelAuth: true });
          return Promise.resolve(res.data);
        case ResponseCode.NO_LEVEL_AUTH:
          setAuth({ indicatorLevelAuth: false });
          return Promise.reject();
        case ResponseCode.NOT_SIGN_IN_1:
        case ResponseCode.NOT_SIGN_IN_2:
        case ResponseCode.TOKEN_ERROR:
          window.location.href = "/sign-in";
          return Promise.reject();
      }
      return Promise.reject(res.msg || "fetch error");
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { request };
