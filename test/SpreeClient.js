var expect = require('chai').expect,
    sinon = require('sinon'),
    SpreeClient = require('../SpreeClient');

describe('SpreeClient', function() {

  var spreeClient = new SpreeClient({ host: 'nebulab.it', port: '3030', namespace: 'v1', protocol: 'http' });

  describe('#baseUrl', function() {
    describe('when protocol option is not present', function() {
      it('returns nebulab.it:3030/v1 uri', function(){
        var spreeClient = new SpreeClient({ host: 'nebulab.it', port: '3030', namespace: 'v1'});
        expect(spreeClient.baseUrl().toString()).to.equal('nebulab.it:3030/v1');
      });
    });

    describe('when host option is not present', function() {
      it('returns http://v1 uri', function(){
        var spreeClient = new SpreeClient({ port: '3030', namespace: 'v1', protocol: 'http' });
        expect(spreeClient.baseUrl().toString()).to.equal('http://v1');
      });
    });

    describe('when port option is not present', function() {
      it('returns http://nebulab.it/v1 uri', function(){
        var spreeClient = new SpreeClient({ host: 'nebulab.it', namespace: 'v1', protocol: 'http' });
        expect(spreeClient.baseUrl().toString()).to.equal('http://nebulab.it/v1');
      });
    });

    describe('when namespace option is not present', function() {
      it('returns http://nebulab.it:3030 uri', function(){
        var spreeClient = new SpreeClient({ host: 'nebulab.it', port: '3030', protocol: 'http' });
        expect(spreeClient.baseUrl().toString()).to.equal('http://nebulab.it:3030');
      });
    });

    describe('when all options are present', function() {
      it('returns http://nebulab.it:3030/v1 uri', function(){
        expect(spreeClient.baseUrl().toString()).to.equal('http://nebulab.it:3030/v1');
      });
    });
  });

  describe('#api', function() {
    it('resets url property equal to baseUrl', function(){
      expect(spreeClient.api.url.toString()).to.equal(spreeClient.baseUrl().toString());
    });
  });

  describe('request', function() {
    describe('order', function() {
      describe('with 11 as id', function() {
        it('returns http://nebulab.it:3030/v1/orders/11 url', function(){
          expect(spreeClient.api.orders(11).url.toString()).to.equal('http://nebulab.it:3030/v1/orders/11');
        });
      });

      describe('without an id', function() {
        it('returns http://nebulab.it:3030/v1/orders url', function(){
          expect(spreeClient.api.orders().url.toString()).to.equal('http://nebulab.it:3030/v1/orders');
        });
      });
    });

    describe('line items', function() {
      describe('with 11 as order id and 20 as line item id', function() {
        it('returns http://nebulab.it:3030/v1/orders/11/line_items/20 url', function(){
          expect(spreeClient.api.orders(11).lineItems(20).url.toString()).to.equal('http://nebulab.it:3030/v1/orders/11/line_items/20');
        });
      });

      describe('without nested resource id', function() {
        it('returns a well formatted url', function(){
          expect(spreeClient.api.orders(11).lineItems().url.toString()).to.equal('http://nebulab.it:3030/v1/orders/11/line_items');
        });
      });
    });
  });

  describe('#query', function() {
    it('adds query params to the url property', function(){
      expect(spreeClient.api.orders(11).query({ next: true }).url.toString()).to.equal('http://nebulab.it:3030/v1/orders/11?next=true');
    });
  });

  describe('#fetch', function() {
    it('pending');
  });

  describe('#update', function() {
    it('pending');
  });

  describe('#save', function() {
    it('pending');
  });

  describe('#del', function() {
    it('pending');
  });
});
