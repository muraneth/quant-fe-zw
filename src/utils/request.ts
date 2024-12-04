import fetch from "isomorphic-fetch";
import { removeSpacesFromObject, getUserInfo } from "@/utils/common";
import { serverUrl } from '@/constants/common';

interface IFetchParams {
  url: string;
  method: "GET" | "POST";
  body?: Record<string, any>;
}

enum ResponseCode {
  // 成功
  SUCCESS = 0,
  // 未登录
  NOT_SIGN_IN = 1009,
  // token 校验失败
  TOKEN_ERROR = 1010,
  // 无权限
  NO_PERMISSION = 3025,
}

const envMode = import.meta.env.MODE;

const request = ({ url, method, body = {} }: IFetchParams) => {
  const fetchUrl = `${serverUrl[envMode]}${url}`;

  const fetchBody =
    method === "GET"
      ? JSON.stringify(body)
      : JSON.stringify(removeSpacesFromObject(body));

  const { token, uid } = getUserInfo();
  const fetchHeaders = {
    "content-type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Authorization: token,
    Uid: uid,
  };

  return fetch(fetchUrl, {
    method,
    credentials: "same-origin",
    body: fetchBody,
    headers: fetchHeaders,
  })
    .then((res) => res.json())
    .then((res) => {
      switch (res.code) {
        case ResponseCode.NO_PERMISSION:
        case ResponseCode.SUCCESS:
          return Promise.resolve(res.data);
        case ResponseCode.NOT_SIGN_IN:
        case ResponseCode.TOKEN_ERROR:
          window.location.href = "/sign-in";
          return Promise.reject();
      }
      return Promise.reject(); 
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { request };
