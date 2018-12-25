import { NativeModules, NativeEventEmitter, AppState, Platform } from 'react-native';
import { v4 } from 'uuid';
import { logger } from '../services';
import { jump, refresh, popTo, getCurrent, reset } from '../router/router';
import RNInstance from '../common/rn-instance';
import { firstLESecond, firstLTSecond } from '../common/util'
import { service } from '../services';

import Config from '../config'
let instance = RNInstance.getInstance();

const { ReactModule } = NativeModules;
const ReactModuleEmitter = new NativeEventEmitter(ReactModule);

/**
 * 经由APP路由库进行路由跳转
 * @param {String} appPath app路由库注册路由
 * @param {Object} params  路由跳转参数，flag控制是否启动一个新的实例，1 启动 0 不启动
 */ 
export function startActivity (appPath, params = { flag: '0' }) {
  if(appPath) {
    ReactModule.startActivityFromJS(appPath, params);
  }
}

/**
 * 结束当前RN实例
 */ 
export function finishActivity () {
  ReactModule.finishActivity();
}

/**
 * 获取用户信息
 * @param {Object} params refresh控制是否强制刷新用户信息， 1 是 0 否
 */ 
export function getUserInfo(params = {refresh: '0'}) {
  return ReactModule.getUserInfo(params).catch(err => {
    startActivity('/')
  });
}

// 事件上报
export function eventReport(id, params = {}) {
  setTimeout(function() {
    ReactModule.mobClick && ReactModule.mobClick(''+id, params);
  }, 0);
}

export function qrcodeScan(params = {refresh: '0'}) {
  return ReactModule.qrcodeScan(params);
}
//选择工资卡 //机构开户 选择银行卡
export function selectWageCard(params = {a: true,type:""}) {
  return ReactModule.selectWageCard(params);
}

// 事件监听注册
export function subscribe() {
  // 监听app调用
  const subscription = ReactModuleEmitter.addListener('EventReminder', AppEventListener);
  
  // 监听APP状态，android为activity状态
  AppState.addEventListener('change', handleAppStateChange);

  return function() {
    subscription.remove();
    AppState.removeEventListener('change', handleAppStateChange);
  }
}

// jump跳转事件处理
function jumpHandle(reminder) {
  let { RNKey } = reminder;
  let router = instance.find(RNKey);

  // if(router) {
  //   popTo(router.key, {oldProps: router.props, newProps: reminder})
  // } else {
    jump(RNKey, reminder);
  // }
}

// show展示事件处理
function showHandle(reminder = {}) {
  instance.status = true;
  instance.syncUserStatus = true;

  syncUserInfo().then(result => {
    // 刷新当前页面
    reminder.hash = v4()
    refresh(reminder)
  })
}

// hide隐藏事件处理
function hideHandle() {
  instance.status = false;
}

function resetHandle(reminder = {}) {
  reset(reminder.RNKey, reminder);
}

// 同步用户信息
function syncUserInfo() {
  return getUserInfo().then(result => {
    // 设置service用户信息
    service.$setUserInfo({
      userId: result.userId || '',
      token: result.token || '',
      appVersion: ReactModule.v
    });
    instance.syncUserStatus = false;
  });
}

// 监听APP状态处理函数
function handleAppStateChange(nextAppState) {
  switch(nextAppState) {
    case 'active': showHandle(); break;
    case 'background': hideHandle(); break;
    default: break;
  }
}

// 监听app调用处理函数
function AppEventListener(reminder) {
  let { RNKey, RNType, ReactTag } = reminder;
  let promise = Promise.resolve(true);
  // Todo 待废弃
  Config.getConfig('name') == 'maojiuhui' && Platform.OS == 'android' && firstLTSecond(ReactModule.v, "1.6.0") && (ReactTag = instance.ReactTag);
  Config.getConfig('name') == 'yunmatong' && Platform.OS == 'android' && (ReactTag = instance.ReactTag);

  // 禁止非当前实例接收消息
  if(instance.ReactTag != ReactTag) return;

  // 用户信息同步
  if(instance.syncUserStatus || RNType == "reset") {
    promise = syncUserInfo();
  }

  promise.then(result => {
    try{
      switch(RNType) {
        case "jump": jumpHandle(reminder); break;
        case 'show': showHandle(reminder); break;
        case 'hide': hideHandle(reminder); break;
        case 'reset': resetHandle(reminder); break;
        default: break;
      }
    }catch(err) {
      startActivity('/')
    }
  })
}
// 登录
export function loginAction(dic) {
  return ReactModule.loginRefresh(dic);
}
// 登出
export function logout(){
  reset('home');
  return ReactModule.logout();
}
export function scanIDCard(){
  return ReactModule.scanIDCard({});
}