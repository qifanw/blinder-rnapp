import { service, logger } from './services';
import { init, jumpApp, DefaultKey } from './router';
import { getUserInfo, subscribe, APP_V, appKey, appSecret } from './communication';
import { setItem } from './common/local-store';
import { removeItem } from './common/local-store'
import RNInstance from './common/rn-instance'
import Config from './config'

const utilService = service.$getUtilService();

// 启动参数
// RNKey String 路由key
// flag String 启动方式，控制下次跳转是否通过App路由库
// other 其他启动参数
export function initRN(props) {
  // 监听App主动传值的事件，在componentWillUnmount摧毁
  let listenerDestory = subscribe();
  
  // 初始化RN实例
  let instance = RNInstance.getInstance();
  instance.ReactTag = props.rootTag;

  return Promise.all([getUserInfo(), getCurrentTime()]).then(results => {
    let [userInfo = {}, currentTime = new Date().getTime()] = results;
    // 设置service用户信息
    service.$setUserInfo({
      userId: userInfo.userId || '',
      token: userInfo.token || '',
      appVersion: APP_V,
    });

    service.$setAuthInfo(appKey, appSecret, currentTime - new Date().getTime());

  }).then(result => {
    // 初始化RN路由栈
    const RNKey = props.RNKey || DefaultKey;
    props.preload != 1 && init(RNKey, props);
  })
  .then(result => { // 初始化需要在componentWillUnmount摧毁的东西
    return function () {
      listenerDestory();
    }
  }).catch(err => {
    // logger.error("react native init error!", err.message);
    jumpApp('/');
  })
}

// 初始化RN路由栈
export function initRouter(props) {
  const RNKey = props.RNKey || DefaultKey;
  init(RNKey, props);
}

function getCurrentTime() {
  return utilService.$getCurrentTime().then(result => {
    if(result.message.code == 0) {
      return result.currentTime;
    }
  }).catch(err => {
    // logger.error("utilService.$getCurrentTime", err);
  })
}