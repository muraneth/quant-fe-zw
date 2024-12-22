import { request } from "@/utils/request";
import { TokenDetailInfo } from "./charts";

type TokenInfoListResDto = Array<TokenDetailInfo>;

export function getTokenDetailList(
    params?: TokenInfoListResDto
): Promise<TokenInfoListResDto> {
    return request({
        url: "/data/api/token/getTokenTable",
        method: "GET",
        params,
    });
}