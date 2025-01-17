import fetch from "isomorphic-fetch";
import { getUserInfo, deleteUserInfo } from "@/utils/common";

interface IFetchParams {
  url: string;
  method: "GET" | "POST";
  params?: Record<string, any>;
}

enum ResponseCode {
  // 成功
  SUCCESS = 0,
  USER_ERROR = 1008,
  USER_ERROR_1 = 1009,
  USER_ERROR_2 = 1010,
  USER_ERROR_3 = 1011,
  TOKEN_ERROR = 1012,
  TOKEN_ERROR_2 = 1013,

  USER_EMAIL_EXIST = 2022,
  USER_NAME_EXIST = 2023,


  // 无 level 权限
  NO_LEVEL_AUTH = 3026,

  CodeBalanceNotEnough = 4030,
	CodeTxInvalid = 4031,
	CodeTxNotFound = 4032,
	CodeCheckTxFailed = 4033,
	CodeTxWrongValue = 4034,
	CodeWrongTx = 4035
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
        case ResponseCode.SUCCESS:
          return Promise.resolve(res.data);
        case ResponseCode.NO_LEVEL_AUTH:
          return Promise.resolve(null);
        case ResponseCode.USER_ERROR:
        case ResponseCode.USER_ERROR_1:
        case ResponseCode.USER_ERROR_2:
        case ResponseCode.USER_ERROR_3:
        case ResponseCode.TOKEN_ERROR:
        case ResponseCode.TOKEN_ERROR_2:        
          deleteUserInfo();
          window.location.href = "/sign-in";
          return Promise.reject();
        case ResponseCode.USER_EMAIL_EXIST:
          return Promise.reject(new Error("USER_EMAIL_EXIST"));
        case ResponseCode.USER_NAME_EXIST:
          return Promise.reject(new Error("USER_NAME_EXIST"));
       
        case ResponseCode.CodeTxInvalid:
        case ResponseCode.CodeTxNotFound:
        case ResponseCode.CodeCheckTxFailed:
        case ResponseCode.CodeTxWrongValue:
        case ResponseCode.CodeWrongTx:
          return Promise.reject(new Error("TX_ERROR"));
        case ResponseCode.CodeBalanceNotEnough:
          return Promise.reject(new Error("BALANCE_NOT_ENOUGH"));
      }
      return Promise.reject(res.msg || "fetch error");
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export { request };
