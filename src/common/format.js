import { isString } from 'lodash'

export function formatBankAccount (account) {
  return formatMobile(account);
}

export function formatMobile (mobile1) {
  var mobile = mobile1.toString();
  if (!mobile || mobile.length < 4) {
    return mobile;
  }
  return mobile.substring(mobile.length - 4);
}

export function replaceByStar (text, start, end) {
  text += '';
  if (!text) {
    return '--';
  }
  start = start < 0 ? 0 : start;
  start = start >= text.length ? text.length - 1 : start;
  end = end < 0 ? 0 : end;
  end = end >= text.length ? text.length - 1 : end;
  var pre = text.substr(0, start);
  var after = text.substr(end);
  var middle = text.substr(0, end - start).replace(/[0-9]/g, '*');
  return pre + middle + after;
}

export function formatMoney (s, n) {
  if (isNaN(s)) {
    return '--';
  }
  var negative = false;
  if (s < 0) {
    negative = true;
    s = Math.abs(s);
  }
  try {
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";// eslint-disable-line
    var l = s.split('.')[0].split('').reverse();
    var r = s.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    r = r ? '.' + r : '';
    var result = t.split('').reverse().join('') + r;
    if (negative) {
      return '-' + result;
    } else {
      return result;
    }
  } catch (e) {
    return '';
  }
}

/*工具类函数*/
//格式化银行卡显示
export function formatBankAccountCard(e, that) {
  if (!isNaN(that.value.replace(/[ ]/g, ""))) {
    //四位数字一组，以空格分割
    that.value = that.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
  } else {
    //当输入非法字符时，禁止除退格键以外的按键输入
    if (e.keyCode == 8) {
      return true;
    } else {
      return false;
    }
  }
}

export function formatMoneyLessZero (s, n) {
  if (isNaN(s)) {
    return '--';
  }
  if (s < 0) {
    return '--';
  }
  try {
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";// eslint-disable-line
    var l = s.split('.')[0].split('').reverse();
    var r = s.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    r = r ? '.' + r : '';
    return t.split('').reverse().join('') + r;
  } catch (e) {
    return '';
  }
}

export function formatMoneyWithZeroReplace (s, n, replace) {
  replace = replace || '--';
  if (s) {
    return formatMoney(s, n);
  }
  return replace;
}

export function formatWan (s, n) {
  s = s / 10000;
  n = n || 0;
  return formatMoney(s, n);
}

export function formatWanDot (s, n) {
  s = s / 10000;
  return formatMoney(s, n);
}

export function formatYi (s, n) {
  s = s / 100000000;
  if (typeof n == 'undefined') {
    n = 0;
  }
  return formatMoney(s, n);
}

export function formatDate (date) {
  return formatTime(date, 'yyyy-MM-dd');
}

export function formatDateDesc (date) {
  return formatTime(date, 'yyyy-MM-dd hh:mm:ss');
}


export function  formatDateTime (timeStr) {
  var year, month, day;
  if(timeStr) {
    year = timeStr.slice(0, 4);
    month = timeStr.slice(4, 6);
    day = timeStr.slice(6, 8);
    if (day.length == 0) {
      day = '01';
    }
    var date = [year, month, day].join('-');
    return date
  } else {
    return '';
  }
}

export function formatDateByDot (date) {
  return formatTime(date, 'yyyy.MM.dd');
}


export function formatDateByDotWithoutYear (date) {
  return formatTime(date, 'MM.dd');
}

export function formatDateWithDesc (date) {
  return formatTime(date, 'MM月dd日 hh:mm');
}
export function formatDateWithoutYear (date) {
  return formatTime(date, 'yyyy年MM月');
}
export function formatTime (date, fmt) {
  if (!date) {
    return '--';
  }
  if (isString(date)) {
    date = parseInt(date);
  }
  date = new Date(date);
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
  }

  if (fmt.indexOf('0') == 0) {
    fmt = fmt.substr(1);
  }
  return fmt;
}

export function formatObject (obj) {
  for (var key in obj) {
    obj[key] = obj[key] || '';
  }
}



export function moneyUnit (money) {
  if (parseFloat(money) < 1) {
    return money * 100 + '分';
  } else if (parseInt(money) < 10000) {
    return money + '元';
  } else if (parseInt(money) < 100000000) {
    return formatWan(money) + '万元';
  } else {
    return formatYi(money, 2) + '亿元';
  }
}

export function moneyUnitWithoutFormat (money) {
  if (parseFloat(money) < 1) {
    return money * 100 + '分';
  } else if (parseInt(money) < 10000) {
    return money + '';
  } else if (parseInt(money) < 100000000) {
    return parseInt(money) / 10000 + '万';
  } else {
    return parseInt(money) / 100000000 + '亿';
  }
}

// 格式化工具函数
export function getLastDays (input, isShort) {
  input = Math.abs(input);
  var minSecondsPerDay = 86400 * 1000;
  var minSecondsPerHour = 3600 * 1000;
  var minSecondsPerMin = 60 * 1000;
  var days = Math.floor(input / minSecondsPerDay);
  var hours = Math.floor((input % minSecondsPerDay) / minSecondsPerHour);
  var minutes = Math.floor((input % minSecondsPerDay % minSecondsPerHour) / minSecondsPerMin);
  var seconds = Math.floor(input % minSecondsPerDay % minSecondsPerHour % minSecondsPerMin / 1000);
  /*    if (minutes < 10) {
    minutes = '0' + minutes;
    }
    if (seconds < 10) {
    seconds = '0' + seconds;
    } */
  if (isShort) {
    if (days >= 1) {
      return days + '天' + hours + '小时';
    } else if (hours >= 1) {
      return hours + '小时' + minutes + '分';
    } else {
      return minutes + '分' + seconds + '秒';
    }
  }
  // alert(input);
  return days + '天' + hours + '时' + minutes + '分' + seconds + '秒';
}

// html转码
export function escapeHTML (a) {
  a = '' + a;
  return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/amp;/g, '');
}

