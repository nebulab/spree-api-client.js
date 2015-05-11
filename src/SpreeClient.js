import Uri from 'jsuri';
import axios from 'axios';
import morph from 'morph';

class SpreeClient {

  constructor(options) {
    this.options = options;
    this.url = null;

    SpreeClient.endpoints().forEach((endpoint) =>
      this[morph.toCamel(endpoint)] = function(id){
        this.url = this.url.setPath(`${this.url.path()}/${endpoint}`)
        if (typeof id != "undefined") {
          this.url = this.url.setPath(`${this.url.path()}/${id}`)
        }
        return this
      }
    );

    let methods = { fetch: "GET", update: "PUT", save: "POST", del: "DELETE" };
    for (let key in methods) {
      this[key] = function(data) {
        return this.request(this.url.toString(), methods[key], data);
      }
    }
  }

  static endpoints() {
    return [ 'products', 'product_properties', 'variants', 'orders',
      'line_items', 'checkouts', 'payments', 'return_authorizations',
      'shipments', 'taxonomies', 'addresses', 'countries', 'stock_locations',
      'stock_items', 'stock_movements', 'zones', 'next']
  }

  get api() {
    this.url = this.baseUrl();
    return this;
  }

  baseUrl() {
    let uri = new Uri();
    if(this.options.protocol)
      uri.protocol(this.options.protocol);
    if(this.options.host)
      uri.host(this.options.host);
    if(this.options.port)
      uri.port(this.options.port);
    if(this.options.namespace)
      uri.path(this.options.namespace);
    return uri;
  }

  query(params) {
    for (var prop in params) {
      if(params.hasOwnProperty(prop)){
        this.url.addQueryParam(prop, params[prop])
      }
    }
    return this;
  }

  request(url, method, data) {
    axios({
      url: this.url.toString(),
      method: method,
      transformResponse: [function(data) {
        if (data.length == 0){
          return data
        }else{
          return JSON.parse(data)
        }
      }],
      data: data,
      headers: {
        "X-Spree-Token": this.options.token
      }
    })
  }
}

export default SpreeClient;
