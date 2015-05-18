var expect = require('chai').expect,
    sinon = require('sinon'),
    SpreeApiClient = require('../SpreeApiClient');

describe('SpreeApiClient', function() {

  var spreeClient = new SpreeApiClient("http://nebulab.it:3030").spreeToken('12345').prefix('v1');

  describe('.spreeToken', function() {
    it('sets the the token', function(){
      expect(spreeClient.spreeToken('abc').orders(11)._token).to.equal('abc')
    });
  });

  describe('.request', function() {
    it('have X-Spree-Token header', function(){
      expect(spreeClient.orders(11).request.get().headers['X-Spree-Token']).to.equal('12345')
    });

    it('makes request to the correct url', function(){
      expect(spreeClient.orders(101).request().uri.href).to.equal('http://nebulab.it:3030/v1/orders/101')
    });
  });

  describe('requests', function() {
    describe('.order', function() {
      describe('with 11 as id', function() {
        it('returns http://nebulab.it:3030/v1/orders/11 url', function(){
          expect(spreeClient.orders(11).toString()).to.equal('http://nebulab.it:3030/v1/orders/11');
        });
      });

      describe('without an id', function() {
        it('returns http://nebulab.it:3030/v1/orders url', function(){
          expect(spreeClient.orders().toString()).to.equal('http://nebulab.it:3030/v1/orders');
        });
      });
    });

    describe('.line items', function() {
      describe('with 11 as order id and 20 as line item id', function() {
        it('returns http://nebulab.it:3030/v1/orders/11/line_items/20 url', function(){
          expect(spreeClient.orders(11).lineItems(20).toString()).to.equal('http://nebulab.it:3030/v1/orders/11/line_items/20');
        });
      });

      describe('without nested resource id', function() {
        it('returns http://nebulab.it:3030/v1/orders/11/line_items url', function(){
          expect(spreeClient.orders(11).lineItems().toString()).to.equal('http://nebulab.it:3030/v1/orders/11/line_items');
        });
      });
    });
  });
});
