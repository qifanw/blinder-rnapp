import { Actions } from 'react-native-router-flux';
import { v4 } from 'uuid' 
import { forEach, isObjectLike } from 'lodash'
import { startActivity, finishActivity } from '../communication'
import RNInstance from '../common/rn-instance'
const instance = RNInstance.getInstance();

const DefaultKey = 'Spectrum';

export function jumpRNApp(key = DefaultKey, params = { flag: '1'}) {
  !params.flag && (params.flag = '1')
  params.RNKey = key;
  params.preKey = Actions.currentScene;

  forEach(params, function(value, key) {
    !isObjectLike(value) && (params[key] = ''+value);
  });

  startActivity('/react-native', params)
}

export function jumpApp(path, params = { flag: '1' }) {
  !params.flag && (params.flag = '1')
  params.preKey = Actions.currentScene;
  forEach(params, function(value, key) {
    !isObjectLike(value) && (params[key] = ''+value);
  });
  startActivity(path, params)
}

export function back() {
  instance.pop();
  let popRouter = Actions.pop();
  if(!popRouter) {
    finishActivity();
  } else {
    Actions.refresh({hash: v4()});
  }
}

export function close() {
  finishActivity();
}