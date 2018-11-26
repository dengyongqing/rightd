

export const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
export const isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
export const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
  || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; }(!window.safari || window.safari.pushNotification));

// Internet Explorer 6-11
export const isIE = /* @cc_on!@*/false || !!document.documentMode;

// Edge 20+
export const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
export const isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
export const isBlink = (isChrome || isOpera) && !!window.CSS;
