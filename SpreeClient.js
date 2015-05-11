'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jsuri = require('jsuri');

var _jsuri2 = _interopRequireDefault(_jsuri);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _morph = require('morph');

var _morph2 = _interopRequireDefault(_morph);

var SpreeClient = (function () {
  function SpreeClient(options) {
    var _this = this;

    _classCallCheck(this, SpreeClient);

    this.options = options;
    this.url = null;

    SpreeClient.endpoints().forEach(function (endpoint) {
      return _this[_morph2['default'].toCamel(endpoint)] = function (id) {
        this.url = this.url.setPath('' + this.url.path() + '/' + endpoint);
        if (typeof id != 'undefined') {
          this.url = this.url.setPath('' + this.url.path() + '/' + id);
        }
        return this;
      };
    });

    var methods = { fetch: 'GET', update: 'PUT', save: 'POST', del: 'DELETE' };

    var _loop = function (key) {
      _this[key] = function (data) {
        return this.request(this.url.toString(), methods[key], data);
      };
    };

    for (var key in methods) {
      _loop(key);
    }
  }

  _createClass(SpreeClient, [{
    key: 'api',
    get: function () {
      this.url = this.baseUrl();
      return this;
    }
  }, {
    key: 'baseUrl',
    value: function baseUrl() {
      var uri = new _jsuri2['default']();
      if (this.options.protocol) uri.protocol(this.options.protocol);
      if (this.options.host) uri.host(this.options.host);
      if (this.options.port) uri.port(this.options.port);
      if (this.options.namespace) uri.path(this.options.namespace);
      return uri;
    }
  }, {
    key: 'query',
    value: function query(params) {
      for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
          this.url.addQueryParam(prop, params[prop]);
        }
      }
      return this;
    }
  }, {
    key: 'request',
    value: function request(url, method, data) {
      _axios2['default']({
        url: this.url.toString(),
        method: method,
        transformResponse: [function (data) {
          if (data.length == 0) {
            return data;
          } else {
            return JSON.parse(data);
          }
        }],
        data: data,
        headers: {
          'X-Spree-Token': this.options.token
        }
      });
    }
  }], [{
    key: 'endpoints',
    value: function endpoints() {
      return ['products', 'product_properties', 'variants', 'orders', 'line_items', 'checkouts', 'payments', 'return_authorizations', 'shipments', 'taxonomies', 'addresses', 'countries', 'stock_locations', 'stock_items', 'stock_movements', 'zones', 'next'];
    }
  }]);

  return SpreeClient;
})();

exports['default'] = SpreeClient;
module.exports = exports['default'];