import { getStatusBarHeight } from './util'
import { dropRight, findIndex } from 'lodash'
import { Actions } from 'react-native-router-flux';
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info'

export default class RNInstance {
  constructor() {
    this.ReactTag = '';
    this.status = true;
    this.syncUserStatus = true;
    this.statusBarHeight = 20;
    this.router = [];
    this.created = new Date().getTime();
    getStatusBarHeight().then(result => {
      this.statusBarHeight = result;
      if(DeviceInfo.getDeviceId() == 'iPhone10,3' || DeviceInfo.getDeviceId() == 'iPhone10,6') {
        
        this.homeViewHeight = Dimensions.get('window').height - result - 44 - 49 - 34;
      } else {
        this.homeViewHeight = Dimensions.get('window').height - result - 44 - 49; 
      }
    });
  }

  static getInstance() {
    if(!this.instance) {
      this.instance = new RNInstance();
    }

    return this.instance;
  }

  /*****路由栈管理相关start*******/
  init (key, props) {
    this.router = [];
    this.push(key, props);
  }

  push(key, props) {
    this.router.push({key, props, date: new Date().getTime()});
  }

  pop() {
    if(this.router.length <= 0) {
      return null;
    }

    let router = this.router[this.router.length - 1];
    this.router = dropRight(this.router)
    return router;
  }

  popTo(key) {
    if(this.router.length <= 0) {
      return null;
    }

    let index = findIndex(this.router, function(o) { return o.key == key; });

    if(index == -1) {
      return null;
    }

    let router = [...this.router];
    this.router = dropRight(this.router, this.router.length - index - 1)
    return router;
  }

  refresh(key, props) {
    this.replace(key, props)
  }

  replace(key, props) {
    this.pop();
    this.push(key, props);
  }
  
  clear() {
    let router = this.router;
    this.router = [];
    return this.router;
  }

  find(key) {
    let index = findIndex(this.router, {key});
    if(index != -1) {
      return this.router[index];
    }
  }

  all() {
    return this.router;
  }
  
  getCurrent() {
    return Actions.currentScene;
  }
  /*****路由栈管理相关end*******/
}


