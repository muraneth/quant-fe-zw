# quant-fe

## 依赖环境

- node v20.18.1
- yarn v1.22.19

## 启动

- yarn install
- yarn dev

## 一些说明

- 使用 use-immer 替代 useState，使用姿势基本一致，用起来更加丝滑, 性能更好
  - https://github.com/immerjs/use-immer
- 需要用到全局状态管理的地方，使用 zustand
  - https://awesomedevin.github.io/zustand-vue/docs/introduce/start/zustand 

## 页面路由
+ /charts 
+ /sign-in 登录
+ /sign-up 注册
+ /subscribe 订阅套餐选择
+ /payment 付款

## 部署
+ yarn build
+ docker-compose up
+ http://localhost:4009