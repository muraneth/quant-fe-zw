import { request } from '@/utils/request';

export interface SignUpReqDto {
  source: 'email';
  username: string;
  email: string;
  password: string;
}

export function signUpService(params: SignUpReqDto) {
  return request({
    url: '/data/api/user/signUp',
    method: 'POST',
    body: params
  })
}

export interface SignInReqDto {
  source: 'email';
  email: string;
  password: string;
}

export interface SignInResDto {
  uid: string;
  username: string;
  email: string;
  token: string;
  pic_url: string;
}

export function signInService(params: SignInReqDto): Promise<SignInResDto> {
  return request({
    url: '/data/api/user/login',
    method: 'POST',
    body: params
  })
}