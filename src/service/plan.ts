import { request } from "@/utils/request";
import {SignInResDto} from "@/service/sign-in-up";


interface Des {
    id: string;
    title: string;
}
export interface Plan {
    id: number;
    type: string;
    level:number;
    title: string;
    price : number;
    util: string;
    desc: Des[];
    isPopolar: boolean;
}

export interface SendPayRequest{
    level: number;
    duration: number;
    chain: string;
    address: string;
    tx_hash: string;
    amount: number;
}

export interface UserPayMethod {
    chain : string;
    address : string;
}
export const getPlans = (): Promise<Plan[]> => {
    return request({
        url: "/data/api/plan/getPlans",
        method: "GET",
    });
}

export const getPlan = (id: number): Promise<Plan> => {
    return request({
        url: "/data/api/plan/getPlan",
        method: "GET",
        params: { id },
    });
}
export const getPaymentMethods = (): Promise<Array<UserPayMethod>> => {
    return request({
        url: "/data/api/payment/getUserPayMethod",
        method: "GET",
    });
}
export const postPaid =(params: SendPayRequest): Promise<SignInResDto> => {
    return request({
        url: "/data/api/payment/paid",
        method: "POST",
        params,
    });
}