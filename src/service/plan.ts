import { request } from "@/utils/request";
import exp from "constants";

interface Des {
    id: string;
    title: string;
}
export interface Plan {
    id: number;
    type: string;
    price : number;
    util: string;
    desc: Des[];
    isPopolar: boolean;
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