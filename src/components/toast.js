import RNToast from 'react-native-root-toast'

export const Toast = {
  show: (message, options = {position: RNToast.positions.CENTER}) => {
    let toast = RNToast.show(message, options);
    let duration = options.duration || 2000;
    setTimeout(() => RNToast.hide(toast), duration)
  },
  hide: toast => RNToast.hide(toast)
}
