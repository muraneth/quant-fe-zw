import { request } from "@/utils/request";
import { removeSpacesFromObject } from "@/utils/common";

export interface SignUpReqDto {
  source: "email";
  username: string;
  email: string;
  password: string;
}

/**
 * 用户注册
 */
export function signUpService(params: SignUpReqDto) {
  return request({
    url: "/data/api/user/signUp",
    method: "POST",
    params: removeSpacesFromObject(params),
  });
}

export interface SignInReqDto {
  source: "email";
  email: string;
  password: string;
}

export interface SignInResDto {
  uid: string;
  username: string;
  email: string;
  token: string;
  pic_url: string;
  level: number;
  expires_at: string;
}

/**
 * 用户登录
 */
export function signInService(params: SignInReqDto): Promise<SignInResDto> {
  return request({
    url: "/data/api/user/login",
    method: "POST",
    params: removeSpacesFromObject(params),
  });
}
