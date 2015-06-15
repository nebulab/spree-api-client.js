'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _urlAssembler = require('url-assembler');

var _urlAssembler2 = _interopRequireDefault(_urlAssembler);

var _camelize = require('camelize');

var _camelize2 = _interopRequireDefault(_camelize);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var SpreeApiClient = (function (_UrlAssembler) {
  function SpreeApiClient(baseUrlOrUrlAssembler) {
    var _this2 = this;

    _classCallCheck(this, SpreeApiClient);

    _get(Object.getPrototypeOf(SpreeApiClient.prototype), 'constructor', this).call(this, baseUrlOrUrlAssembler);

    if (baseUrlOrUrlAssembler instanceof _urlAssembler2['default']) {
      this._token = baseUrlOrUrlAssembler._token;
    }

    SpreeApiClient.endpoints().forEach(function (endpoint) {
      return _this2[_camelize2['default'](endpoint)] = function (id) {
        if (typeof id != 'undefined') {
          return this.segment('/' + endpoint + '/:id').param({ id: id });
        } else {
          return this.segment('/' + endpoint);
        }
      };
    });
  }

  _inherits(SpreeApiClient, _UrlAssembler);

  _createClass(SpreeApiClient, [{
    key: 'spreeToken',
    value: function spreeToken(token) {
      var chainable = this._chain();
      chainable._token = token;
      return chainable;
    }
  }, {
    key: 'get',
    value: function get() {
      return _axios2['default'].get(this.toString(), this.headers());
    }
  }, {
    key: 'head',
    value: function head() {
      return _axios2['default'].head(this.toString(), this.headers());
    }
  }, {
    key: 'delete',
    value: function _delete() {
      return _axios2['default']['delete'](this.toString(), this.headers());
    }
  }, {
    key: 'post',
    value: function post(data) {
      return _axios2['default'].post(this.toString(), data, this.headers());
    }
  }, {
    key: 'put',
    value: function put(data) {
      return _axios2['default'].put(this.toString(), data, this.headers());
    }
  }, {
    key: 'patch',
    value: function patch(data) {
      return _axios2['default'].patch(this.toString(), data, this.headers());
    }
  }, {
    key: 'headers',
    value: function headers() {
      if (this._token) {
        return { headers: { 'X-Spree-Token': this._token } };
      } else {
        return {};
      }
    }
  }], [{
    key: 'endpoints',
    value: function endpoints() {
      return ['products', 'product_properties', 'variants', 'orders', 'line_items', 'checkouts', 'payments', 'return_authorizations', 'shipments', 'taxonomies', 'addresses', 'countries', 'stock_locations', 'stock_items', 'stock_movements', 'zones', 'next'];
    }
  }]);

  return SpreeApiClient;
})(_urlAssembler2['default']);

exports['default'] = SpreeApiClient;
module.exports = exports['default'];