'use strict';
/*

static class MDSConsole
  function log(message, ...args);
  function warn(message, ...args)
  function info(message, ...args)
  function system(message, ...args)
  function error(message, ...args)

  function success(message, ...args)
  function fail(message, ...args)

  var fields: Object;
*/

/**
 *
 */
var Mydataspace = {
  initialized: false,
  connected: false,
  loggedIn: false,
  requests: {},
  subscriptions: [],
  lastRequestId: 10000,
  formatters: {},
  listeners: {
    login: [],
    logout: [],
    connected: []
  },

  authProviders: {
    facebook: {
      title: 'Connect through Facebook',
      icon: 'facebook',
      url: 'https://www.facebook.com/dialog/oauth?client_id=827438877364954&scope=email' +
           // '&redirect_uri={{api_url}}%2fauth%3fauthProvider%3dfacebook%26permission%3d{{permission}}%26clientId%3d{{client_id}}' +
           '&redirect_uri={{api_url}}%2fauth%3fauthProvider%3dfacebook' +
           '&display=popup',
      loginWindow: {
        height: 400
      }
    },
    google: {
      title: 'Connect through Google',
      icon: 'google-plus',
      url: 'https://accounts.google.com/o/oauth2/auth' +
           '?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.profile.emails.read&response_type=code' +
           '&client_id=821397494321-s85oh989s0ip2msnock29bq1gpprk07f.apps.googleusercontent.com' +
           '&state=permission%3d{{permission}}%26clientId%3d{{client_id}}' +
           '&redirect_uri={{api_url}}%2fauth%3fauthProvider%3dgoogle',
      loginWindow: {
        height: 800
      }
    }
  },

  getAuthProviders: function() {
    var ret = common.copy(Mydataspace.authProviders);
    for (var providerName in ret) {
      ret[providerName].url =
        ret[providerName].url.replace('{{api_url}}', encodeURIComponent(Mydataspace.options.apiURL));
      ret[providerName].url =
        ret[providerName].url.replace('{{permission}}', Mydataspace.options.permission);
      ret[providerName].url =
        ret[providerName].url.replace('{{client_id}}', Mydataspace.options.clientId);
    }
    return ret;
  },

  getAuthProvider: function(providerName) {
    var prov = Mydataspace.authProviders[providerName];
    if (typeof prov === 'undefined') {
      return null;
    }
    var ret = common.copy(prov);
    ret.url = ret.url.replace('{{api_url}}', encodeURIComponent(Mydataspace.options.apiURL));
    ret.url = ret.url.replace('{{permission}}', Mydataspace.options.permission);
    ret.url = ret.url.replace('{{client_id}}', Mydataspace.options.clientId);
    return ret;
  },

  init: function(options) {
    if (Mydataspace.initialized) {
      console.warn('An attempt to re-initialize the Mydataspace');
      return;
    }
    Mydataspace.options = common.extend({
      connected: function() {
        console.log('Maybe you forgot to specify connected-event handler');
      }
    }, options);
    Mydataspace.on('connected', options.connected);
    window.addEventListener('message', function(e) {
      if (e.data.message === 'authResult') {
        localStorage.setItem('authToken', e.data.result);
        Mydataspace.emit('authenticate', { token: e.data.result });
        e.source.close();
      }
    });
    Mydataspace.initialized = true;
  },

  connect: function() {
    Mydataspace.socket = io(Mydataspace.options.websocketURL, {
      // secure: true,
      'force new connection' : true,
      'reconnectionAttempts': 'Infinity', //avoid having user reconnect manually in order to prevent dead clients after a server restart
      'timeout' : 10000, //before connect_error and connect_timeout are emitted.
      'transports' : ['websocket']
    });

    Mydataspace.on('connect', function () {
      Mydataspace.connected = true;
      if (common.isPresent(localStorage.getItem('authToken'))) {
        Mydataspace.emit('authenticate', { token: localStorage.getItem('authToken') });
      }
      Mydataspace.callListeners('connected');
    });

    Mydataspace.on('authenticated', function() {
      Mydataspace.loggedIn = true;
      Mydataspace.callListeners('login');
    });

    Mydataspace.on('disconnect', function() {
      Mydataspace.connected = false;
      Mydataspace.loggedIn = false;
      Mydataspace.subscriptions = [];
      Mydataspace.lastRequestId = 10000;
      Mydataspace.requests = {};
    });

    Mydataspace.on('entities.err', function(data) {
      Mydataspace.handleResponse(data, 'fail');
    }, false);
    Mydataspace.on('apps.err', function(data) {
      Mydataspace.handleResponse(data, 'fail');
    }, false);
    Mydataspace.on('users.err', function(data) {
      Mydataspace.handleResponse(data, 'fail');
    }, false);
  },

  callListeners: function(eventName, args) {
    var listeners = Mydataspace.listeners[eventName];
    if (typeof listeners === 'undefined') {
      throw new Error('Listener not exists');
    }
    for (var i in listeners) {
      listeners[i](args);
    }
  },

  /**
   * Close the websocket.
   * You need re-initialize listeners after that!
   */
  disconnect: function() {
    Mydataspace.socket.disconnect();
    Mydataspace.socket = null;
  },

  popupCenter: function(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }
    return newWindow;
  },

  login: function(providerName) {
    var authProvider = Mydataspace.getAuthProvider(providerName);
    var authWindow =
      Mydataspace.popupCenter(authProvider.url, 'Login over ' + providerName, 640, authProvider.loginWindow.height);
    authWindow.focus();
    var authCheckInterval = setInterval(function() {
      authWindow.postMessage({ message: 'requestAuthResult' }, '*');
    }, 1000);
  },

  logout: function() {
    localStorage.removeItem('authToken');
    Mydataspace.disconnect();
    Mydataspace.connect();
    Mydataspace.callListeners('logout');
  },

  isLoggedIn: function() {
    return Mydataspace.loggedIn;
  },

  isConnected: function() {
    return Mydataspace.connected;
  },

  emit: function(eventName, data) {
    if (typeof Mydataspace.socket === 'undefined') {
      throw new Error('You must connect to server before emit data');
    }
    if (Array.isArray(data)) {
      data = { datas: data };
    }
    Mydataspace.socket.emit(eventName, data);
  },

  on: function(eventName, callback, ignoreRequestErrors) {
    if (typeof Mydataspace.listeners[eventName] !== 'undefined') {
      Mydataspace.listeners[eventName].push(Mydataspace.formatAndCallIgnoreRequestErrors.bind(Mydataspace, eventName, callback, ignoreRequestErrors));
      return;
    }
    if (typeof Mydataspace.socket === 'undefined') {
      throw new Error('You must connect to server before subscribe to events');
    }
    Mydataspace.socket.on(eventName, Mydataspace.formatAndCallIgnoreRequestErrors.bind(Mydataspace, eventName, callback, ignoreRequestErrors));
  },

  request: function(eventName, data, successCallback, failCallback) {
    var options = {
      success: successCallback || function() {},
      fail: failCallback || function() {}
    };
    if (Array.isArray(data)) {
      if (data.length > 0) {
        data = { datas: data };
      } else {
        successCallback();
        return;
      }
    }
    var responseEventName = eventName + '.res';
    // Store request information to array
    Mydataspace.lastRequestId++;
    data.requestId = Mydataspace.lastRequestId;
    Mydataspace.requests[data.requestId] = {
      options: options,
      eventName: responseEventName
    };

    // Init response handler
    if (Mydataspace.subscriptions.indexOf(responseEventName) === -1) {
      Mydataspace.subscriptions.push(responseEventName);
      Mydataspace.socket.on(responseEventName, function(data) {
        Mydataspace.handleResponse(data, 'success');
      });
    }

    // Send request
    Mydataspace.emit(eventName, data);
  },

  formatAndCallIgnoreRequestErrors: function(eventName, callback, ignoreRequestErrors, data) {
    if (ignoreRequestErrors == null) {
      ignoreRequestErrors = true;
    }
    if (ignoreRequestErrors && data != null && data.requestId != null && eventName.endsWith('.err')) {
      return;
    }
    Mydataspace.formatAndCall(eventName, callback, data);
  },

  formatAndCall: function(eventName, callback, data) {
    var formatterArr = Mydataspace.formatters[eventName];
    if (data != null && data.datas != null) {
      data = data.datas;
    }
    if (formatterArr != null) {
      for (let i in formatterArr) {
        formatterArr[i].format(data);
      }
    }
    callback(data);
  },

  handleResponse: function(data, callbackName) {
    if (typeof data.requestId === 'undefined') {
      return;
    }
    var req = Mydataspace.requests[data.requestId];
    if (typeof req === 'undefined') {
      return;
    }
    delete Mydataspace.requests[data.requestId];
    if (typeof req.options !== 'undefined' && callbackName in req.options) {
      var callback = req.options[callbackName];
      Mydataspace.formatAndCall(req.eventName, callback, data);
    }
  },

  registerFormatter: function(eventName, formatter) {
    if (!(eventName in Mydataspace.formatters)) {
      Mydataspace.formatters[eventName] = [];
    }
    Mydataspace.formatters[eventName].push(formatter);
  }

};
