import UrlAssembler from 'url-assembler';
import camelize from 'camelize';
import requestPromise from 'request-promise';

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

  get request(){
    return requestPromise.defaults({
      uri: this.toString(),
      transform: function(data) {
        if (data.length == 0){
          return data
        }else{
          return JSON.parse(data)
        }
      },
      headers: { 'X-Spree-Token': this._token }
    });
  }

  static endpoints() {
    return [ 'products', 'product_properties', 'variants', 'orders',
      'line_items', 'checkouts', 'payments', 'return_authorizations',
      'shipments', 'taxonomies', 'addresses', 'countries', 'stock_locations',
      'stock_items', 'stock_movements', 'zones', 'next']
  }
}

export default SpreeApiClient;
