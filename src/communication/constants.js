import { NativeModules } from 'react-native';
const { ReactModule } = NativeModules;

// app常量定义
export const ENV = ReactModule.environment; // 环境
export const APP_C = ReactModule.c; // 客户端类别
export const APP_P = ReactModule.p; // 客户端包名
export const APP_S = ReactModule.s; // 系统版本号
export const APP_D = ReactModule.d; // 硬件型号
export const APP_V = ReactModule.v; // 客户端版本号
export const APP_IP = ReactModule.ip; // ip地址

function getUrl(url) {
    if (url.charAt(url.length - 1) == "/") {
        url = url.substr(0, url.length - 1)
    }
    console.log(url)
    return url
}

export const httpUrl = getUrl(ReactModule.httpUrl); // 后端地址
export const loggerUrl = getUrl(ReactModule.loggerUrl); // 日志上报地址
export const appKey = ReactModule.appKey; // appKey
export const appSecret = ReactModule.appSecret; // appSecret

