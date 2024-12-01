// 密码规则: 包含大小写、数字、特殊字符、至少8位
export const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;