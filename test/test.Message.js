'use strict';

var chai = chai || require('chai');
var should = chai.should();
var bitcore = bitcore || require('../bitcore');
var Message = bitcore.Message;
var coinUtil = bitcore.util;

describe('Message', function() {
  describe('sign', function() {
    it('should return a signature', function() {
      var key = bitcore.Key.generateSync();
      var sig = Message.sign('my message', key);
      sig.length.should.be.greaterThan(0);
    });
  });

  describe('verifyWithPubKey', function() {
    it('should verify a signed message', function() {
      var message = 'my message';
      var key = bitcore.Key.generateSync();
      var sig = Message.sign(message, key);
      Message.verifyWithPubKey(key.public, message, sig).should.equal(true);
    });
  });

  describe('magicBytes', function() {
    it('should be "Bitcoin Signed Message:\\n"', function() {
      Message.magicBytes.toString().should.equal('Bitcoin Signed Message:\n');
    });
  });

  describe('magicHash', function() {
    it('should hash the message with the magic bytes', function() {
      var str = 'my message';
      var magicBytes = Message.magicBytes;
      var prefix1 = coinUtil.varIntBuf(magicBytes.length);
      var message = new Buffer(str);
      var prefix2 = coinUtil.varIntBuf(message.length);

      var buf = Buffer.concat([prefix1, magicBytes, prefix2, message]);

      var hash = coinUtil.twoSha256(buf);

      var hash2 = Message.magicHash(str);

      hash.toString().should.equal(hash2.toString());
    });

    it('should hash this message the same way as bitcoinjs-lib', function() {
      var hashHex = '74eacdc6c04724869380907bf4aab561a1494a4a800fba266b29b8158c2c4cec';

      var str = 'this is a test message';
      hashHex.should.equal(Message.magicHash(str).toString('hex'));
    });
  });
});
