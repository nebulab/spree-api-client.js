import UrlAssembler from 'url-assembler';
import camelize from 'camelize';
import axios from 'axios';

class SpreeApiClient extends UrlAssembler {

  constructor(baseUrlOrUrlAssembler) {
    super(baseUrlOrUrlAssembler)

    if (baseUrlOrUrlAssembler instanceof UrlAssembler) {
      this._token = baseUrlOrUrlAssembler._token;
    }

    SpreeApiClient.endpoints().forEach((endpoint) =>
      this[camelize(endpoint)] = function(id){
        if (typeof id != "undefined") {
          return this.segment(`/${endpoint}/:id`).param({ id: id })
        } else {
          return this.segment(`/${endpoint}`)
        }
      }
    );
  }

  spreeToken(token) {
    var chainable = this._chain()
    chainable._token = token;
    return chainable;
  }

  get() {
    return axios.get(this.toString(), { headers: { 'X-Spree-Token': this._token }})
  }

  head() {
    return axios.head(this.toString(), { headers: { 'X-Spree-Token': this._token }})
  }

  delete() {
    return axios.delete(this.toString(), { headers: { 'X-Spree-Token': this._token }})
  }

  post(data) {
    return axios.post(this.toString(), data, { headers: { 'X-Spree-Token': this._token }})
  }

  put(data) {
    return axios.put(this.toString(), data, { headers: { 'X-Spree-Token': this._token }})
  }

  patch(data) {
    return axios.patch(this.toString(), data, { headers: { 'X-Spree-Token': this._token }})
  }

  static endpoints() {
    return [ 'products', 'product_properties', 'variants', 'orders',
      'line_items', 'checkouts', 'payments', 'return_authorizations',
      'shipments', 'taxonomies', 'addresses', 'countries', 'stock_locations',
      'stock_items', 'stock_movements', 'zones', 'next']
  }
}

export default SpreeApiClient;
