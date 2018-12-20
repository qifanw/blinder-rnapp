import { Actions } from 'react-native-router-flux';
import RNInstance from '../common/rn-instance'
const instance = RNInstance.getInstance();

export const DefaultKey = 'Bla';

export function init(key = DefaultKey, props = {}) {
  instance.init(key, props);
  Actions.reset(key, props);
}

export function refresh(params = {}) {
  instance.refresh(Actions.currentScene, params)
  Actions.refresh(params)
}

export function jump(key = DefaultKey, params = {}) {
  params.preKey = Actions.currentScene;
  instance.push(key, params);
  Actions[key](params);
}

export function popTo(key, params = {}) {
  console.log('key值', key);
  instance.popTo(key);
  Actions.popTo(key);
  instance.refresh(Actions.currentScene, params);
  Actions.refresh(params);

}

export function pop(params = {}) {
  instance.pop();
  let popFlag = Actions.pop();

  // if(popFlag) {
  //   instance.refresh(Actions.currentScene, params);
  //   setTimeout(function() {
  //     Actions.refresh(params);
  //   }, 300);
  instance.refresh(Actions.currentScene, params);
  Actions.refresh(params);
}


export function replace(key, params = {}) {
  instance.replace(key, params);
  Actions.replace(key, params);
}

export function reset(key, params = {}) {
  instance.init(key, params);
  Actions.reset(key, params);
}

export function getCurrent() {
  return Actions.currentScene;
}