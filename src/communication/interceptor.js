import { NativeModules, NativeEventEmitter, AppState, Platform } from 'react-native';
import { v4 } from 'uuid';
import { logger } from '../services';
import { jump, refresh, popTo, getCurrent, reset } from '../router/router';
import RNInstance from '../common/rn-instance';
import * as interceptors from './interceptors'

import Config from '../config'
let instance = RNInstance.getInstance();

const { InterceptorModule } = NativeModules;
const ReactModuleEmitter = new NativeEventEmitter(InterceptorModule);

// 拦截器事件监听注册
export function interceptorSubScribe() {
  // 监听app调用
  const subscription = ReactModuleEmitter.addListener('EventReminder', AppEventListener);
  
  return function() {
    subscription.remove();
  }
}

// 监听app调用处理函数
function AppEventListener(reminder) {
  let { ReactTag, RNType,  options = {}, params = {}} = reminder;
  let name = options.__name || '';
  
  // 禁止非当前实例接收消息
  if(instance.ReactTag != ReactTag || !name) return;

  try{
    switch(RNType) {
      case "intercept": interceptors[name].intercept; break;
      case 'complete': interceptors[name].complete; break;
      case 'success': interceptors[name].success; break;
      case 'getStatus': interceptors[name].getStatus; break;
      case 'verify': interceptors[name].verify; break;
      default: break;
    }
  }catch(err) {
    // logger.error("interceptor AppEventListener", err);
  }
}
