import { NativeEventEmitter, NativeModules, Platform, StatusBar } from 'react-native';

const { StatusBarManager } = NativeModules;


export function getStatusBarHeight() {
  return new Promise(resolve => {
    switch(Platform.OS) {
      case 'ios': 
        StatusBarManager.getHeight(({height}) => {
          height == 0 && (height = 20)
          resolve(height)
        });
        break;
      case 'android': 
        resolve(StatusBar.currentHeight);
        break;
      default: 
        resolve(20);
        break;
    }
  })
}

export function isNotBlock(data) {
  return data != "" && data;
}

export function betweenVersion (version, lower, upper) {
  return compare(version, lower) >= 0 && compare(version, upper) <= 0;
}

export function firstGESecond (versionA, versionB) {
  return compare(versionA, versionB) >= 0;
}

export function firstGTSecond (versionA, versionB) {
  return compare(versionA, versionB) > 0;
}

export function firstLESecond (versionA, versionB) {
  return compare(versionA, versionB) <= 0;
}

export function firstLTSecond (versionA, versionB) {
  return compare(versionA, versionB) < 0;
}

export function compare (a, b) {
  a = a.split(/[^\d]+/g);
  b = b.split(/[^\d]+/g);
  var len = a.length;
  for (var i = 0; i < len; i++) {
    if ((a[i] || 0) != (b[i] || 0)) return a[i] - b[i];
  }
  return 0;
}