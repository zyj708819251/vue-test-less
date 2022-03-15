let Tools = {
  //全屏
  enterFullScreen() {
    let el = document.documentElement
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
    if (rfs) { // typeof rfs != "undefined" && rfs
      rfs.call(el)
    } else if (typeof window.ActiveXObject !== 'undefined') {
      // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
      let wscript = new ActiveXObject('WScript.Shell')
      if (wscript != null) {
        wscript.SendKeys('{F11}')
      }
    }
  },

  getNowTime() {
    var date = new Date();
    var year, month, day, hour, min, second;
    year = date.getFullYear();
    parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date
        .getMonth()) +
      1;
    date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
    date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
    date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
    date.getSeconds() < 10 ? second = '0' + date.getSeconds() : second = date.getSeconds();

    return {
      dateMonthYear: year + '年' + month + '月' + day + '日',
      hourMinSrcond: hour + ':' + min + ':' + second
    }
  },
  //千分位
  formatNum(num) {
    return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  },
  transformFontSize(num) {
    var fontSize = document.documentElement.style.fontSize.split('px')[0];
    if (fontSize) {
      return num / 100 + 'rem';
    } else {
      return num + 'px';
    }
  },
  transformEchartsSize(num) {
    var fontSize = document.documentElement.style.fontSize.split('px')[0];
    if (fontSize) {
      const scale = document.documentElement.clientWidth / 1920
      return scale * num;
    } else {
      return num;
    }
  }
}

export default Tools
