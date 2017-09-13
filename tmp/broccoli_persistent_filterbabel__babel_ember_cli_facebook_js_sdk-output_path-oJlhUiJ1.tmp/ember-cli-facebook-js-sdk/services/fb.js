define('ember-cli-facebook-js-sdk/services/fb', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend(_ember['default'].Evented, {
    fbInitPromise: null,
    locale: null,

    FBInit: function FBInit() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (this.fbInitPromise) {
        return this.fbInitPromise;
      }

      var ENV = _ember['default'].getOwner(this).resolveRegistration('config:environment');

      var initSettings = _ember['default'].$.extend({}, ENV.FB || {}, options);

      // Detect language configuration and store it.
      var locale = initSettings.locale || 'en_US';
      this.locale = locale;

      if (ENV.FB && ENV.FB.skipInit) {
        this.fbInitPromise = _ember['default'].RSVP.Promise.resolve('skip init');
        return this.fbInitPromise;
      }

      var original = window.fbAsyncInit;
      if (!initSettings || !initSettings.appId || !initSettings.version) {
        return _ember['default'].RSVP.reject('No settings for init');
      }

      this.fbInitPromise = new _ember['default'].RSVP.Promise(function (resolve) {
        window.fbAsyncInit = function () {
          window.FB.init(initSettings);
          _ember['default'].run(null, resolve);
        };
        // URL for the SDK is built according to locale. Defaults to `en_US`.
        _ember['default'].$.getScript('https://connect.facebook.net/' + locale + '/sdk.js', function () {
          // Do nothing here, wait for window.fbAsyncInit to be called.
        });
      }).then(function () {
        if (original) {
          window.fbAsyncInit = original;
          window.fbAsyncInit();
          window.fbAsyncInit.hasRun = true;
        }
      });

      return this.fbInitPromise;
    },

    setAccessToken: function setAccessToken(token) {
      this.accessToken = token;
      this.trigger('fb.setAccessToken', token);
      return token;
    },

    loginWith: function loginWith(token) {
      console.warn('DEPRECATED: please, use setAccessToken instead');
      this.setAccessToken(token);
    },

    _api: function _api(path) {
      var method = 'GET';
      var parameters = {};
      var arg;

      if (!path) {
        return _ember['default'].RSVP.reject('Please, provide a path for your request');
      }

      switch (arguments.length) {
        case 2:
          arg = arguments[1];
          if (typeof arg === 'string') {
            method = arg;
          } else {
            parameters = arg;
          }
          break;
        case 3:
          method = arguments[1];
          parameters = arguments[2];
      }

      parameters = _ember['default'].$.extend(parameters, { access_token: this.accessToken });

      return this.FBInit().then(function () {
        return new _ember['default'].RSVP.Promise(function (resolve, reject) {
          window.FB.api(path, method, parameters, function (response) {
            if (response.error) {
              _ember['default'].run(null, reject, response.error);
              return;
            }

            _ember['default'].run(null, resolve, response);
          });
        });
      });
    },

    api: function api() {
      var _this = this,
          _arguments = arguments;

      return this._api.apply(this, arguments)['catch'](function (error) {
        if (error.code === 190) {
          console.debug('Trying to refresh Facebook session an re-do the Facebook API request');
          return _this.getLoginStatus().then(function (response) {
            if (response.status === 'connected') {
              _this.setAccessToken(response.authResponse.accessToken);
              return _this._api.apply(_this, _arguments);
            }
            return _ember['default'].RSVP.reject(response);
          });
        }
        return _ember['default'].RSVP.reject(error);
      });
    },

    ui: function ui(params) {
      return this.FBInit().then(function () {
        return new _ember['default'].RSVP.Promise(function (resolve, reject) {
          window.FB.ui(params, function (response) {
            if (response && !response.error_code) {
              _ember['default'].run(null, resolve, response);
              return;
            }

            _ember['default'].run(null, reject, response);
          });
        });
      });
    },

    // Facebook Login Methods

    getLoginStatus: function getLoginStatus(forceRequest) {
      return this.FBInit().then(function () {
        return new _ember['default'].RSVP.Promise(function (resolve) {
          window.FB.getLoginStatus(function (response) {
            _ember['default'].run(null, resolve, response);
          }, forceRequest);
        });
      });
    },

    login: function login(scope) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var service = this;
      var params = { scope: scope, return_scopes: true };

      if (options) {
        params = _ember['default'].assign(params, options);
      }

      return this.FBInit().then(function () {
        return new _ember['default'].RSVP.Promise(function (resolve, reject) {
          window.FB.login(function (response) {
            if (response.authResponse) {
              service.accessToken = response.authResponse.accessToken;
              _ember['default'].run(null, resolve, response);
            } else {
              _ember['default'].run(null, reject, response);
            }
          }, params);
        });
      });
    },

    logout: function logout() {
      return this.FBInit().then(function () {
        return new _ember['default'].RSVP.Promise(function (resolve) {
          window.FB.logout(function (response) {
            _ember['default'].run(null, resolve, response);
          });
        });
      });
    },

    getAuthResponse: function getAuthResponse() {
      return window.FB.getAuthResponse();
    },

    xfbml_parse: function xfbml_parse() {
      return this.FBInit().then(function () {
        return new _ember['default'].RSVP.Promise(function (resolve) {
          return window.FB.XFBML.parse(undefined, function () {
            _ember['default'].run(null, resolve, 'XFBML.parse');
          });
        });
      });
    }
  });
});