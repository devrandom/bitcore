'use strict';

var chai = chai || require('chai');
var should = chai.should();
var bitcore = bitcore || require('../bitcore');
var BIP32 = bitcore.BIP32;
var BIP39WordlistEn = bitcore.BIP39WordlistEn;

describe('BIP32', function() {

  //test vectors: https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
  var vector1_master = '000102030405060708090a0b0c0d0e0f';
  var vector1_m_public = 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
  var vector1_m_private = 'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi';
  var vector1_m0h_public = 'xpub68Gmy5EdvgibQVfPdqkBBCHxA5htiqg55crXYuXoQRKfDBFA1WEjWgP6LHhwBZeNK1VTsfTFUHCdrfp1bgwQ9xv5ski8PX9rL2dZXvgGDnw';
  var vector1_m0h_private = 'xprv9uHRZZhk6KAJC1avXpDAp4MDc3sQKNxDiPvvkX8Br5ngLNv1TxvUxt4cV1rGL5hj6KCesnDYUhd7oWgT11eZG7XnxHrnYeSvkzY7d2bhkJ7';
  var vector1_m0h1_public = 'xpub6ASuArnXKPbfEwhqN6e3mwBcDTgzisQN1wXN9BJcM47sSikHjJf3UFHKkNAWbWMiGj7Wf5uMash7SyYq527Hqck2AxYysAA7xmALppuCkwQ';
  var vector1_m0h1_private = 'xprv9wTYmMFdV23N2TdNG573QoEsfRrWKQgWeibmLntzniatZvR9BmLnvSxqu53Kw1UmYPxLgboyZQaXwTCg8MSY3H2EU4pWcQDnRnrVA1xe8fs';
  var vector1_m0h12h_public = 'xpub6D4BDPcP2GT577Vvch3R8wDkScZWzQzMMUm3PWbmWvVJrZwQY4VUNgqFJPMM3No2dFDFGTsxxpG5uJh7n7epu4trkrX7x7DogT5Uv6fcLW5';
  var vector1_m0h12h_private = 'xprv9z4pot5VBttmtdRTWfWQmoH1taj2axGVzFqSb8C9xaxKymcFzXBDptWmT7FwuEzG3ryjH4ktypQSAewRiNMjANTtpgP4mLTj34bhnZX7UiM';
  var vector1_m0h12h2_public = 'xpub6FHa3pjLCk84BayeJxFW2SP4XRrFd1JYnxeLeU8EqN3vDfZmbqBqaGJAyiLjTAwm6ZLRQUMv1ZACTj37sR62cfN7fe5JnJ7dh8zL4fiyLHV';
  var vector1_m0h12h2_private = 'xprvA2JDeKCSNNZky6uBCviVfJSKyQ1mDYahRjijr5idH2WwLsEd4Hsb2Tyh8RfQMuPh7f7RtyzTtdrbdqqsunu5Mm3wDvUAKRHSC34sJ7in334';
  var vector1_m0h12h21000000000_public = 'xpub6H1LXWLaKsWFhvm6RVpEL9P4KfRZSW7abD2ttkWP3SSQvnyA8FSVqNTEcYFgJS2UaFcxupHiYkro49S8yGasTvXEYBVPamhGW6cFJodrTHy';
  var vector1_m0h12h21000000000_private = 'xprvA41z7zogVVwxVSgdKUHDy1SKmdb533PjDz7J6N6mV6uS3ze1ai8FHa8kmHScGpWmj4WggLyQjgPie1rFSruoUihUZREPSL39UNdE3BBDu76';
  var vector2_master = 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542';
  var vector2_m_public = 'xpub661MyMwAqRbcFW31YEwpkMuc5THy2PSt5bDMsktWQcFF8syAmRUapSCGu8ED9W6oDMSgv6Zz8idoc4a6mr8BDzTJY47LJhkJ8UB7WEGuduB';
  var vector2_m_private = 'xprv9s21ZrQH143K31xYSDQpPDxsXRTUcvj2iNHm5NUtrGiGG5e2DtALGdso3pGz6ssrdK4PFmM8NSpSBHNqPqm55Qn3LqFtT2emdEXVYsCzC2U';
  var vector2_m0_public = 'xpub69H7F5d8KSRgmmdJg2KhpAK8SR3DjMwAdkxj3ZuxV27CprR9LgpeyGmXUbC6wb7ERfvrnKZjXoUmmDznezpbZb7ap6r1D3tgFxHmwMkQTPH';
  var vector2_m0_private = 'xprv9vHkqa6EV4sPZHYqZznhT2NPtPCjKuDKGY38FBWLvgaDx45zo9WQRUT3dKYnjwih2yJD9mkrocEZXo1ex8G81dwSM1fwqWpWkeS3v86pgKt';
  var vector2_m02147483647h_public = 'xpub6ASAVgeehLbnwdqV6UKMHVzgqAG8Gr6riv3Fxxpj8ksbH9ebxaEyBLZ85ySDhKiLDBrQSARLq1uNRts8RuJiHjaDMBU4Zn9h8LZNnBC5y4a';
  var vector2_m02147483647h_private = 'xprv9wSp6B7kry3Vj9m1zSnLvN3xH8RdsPP1Mh7fAaR7aRLcQMKTR2vidYEeEg2mUCTAwCd6vnxVrcjfy2kRgVsFawNzmjuHc2YmYRmagcEPdU9';
  var vector2_m02147483647h1_public = 'xpub6DF8uhdarytz3FWdA8TvFSvvAh8dP3283MY7p2V4SeE2wyWmG5mg5EwVvmdMVCQcoNJxGoWaU9DCWh89LojfZ537wTfunKau47EL2dhHKon';
  var vector2_m02147483647h1_private = 'xprv9zFnWC6h2cLgpmSA46vutJzBcfJ8yaJGg8cX1e5StJh45BBciYTRXSd25UEPVuesF9yog62tGAQtHjXajPPdbRCHuWS6T8XA2ECKADdw4Ef';
  var vector2_m02147483647h12147483646h_public = 'xpub6ERApfZwUNrhLCkDtcHTcxd75RbzS1ed54G1LkBUHQVHQKqhMkhgbmJbZRkrgZw4koxb5JaHWkY4ALHY2grBGRjaDMzQLcgJvLJuZZvRcEL';
  var vector2_m02147483647h12147483646h_private = 'xprvA1RpRA33e1JQ7ifknakTFpgNXPmW2YvmhqLQYMmrj4xJXXWYpDPS3xz7iAxn8L39njGVyuoseXzU6rcxFLJ8HFsTjSyQbLYnMpCqE2VbFWc';
  var vector2_m02147483647h12147483646h2_public = 'xpub6FnCn6nSzZAw5Tw7cgR9bi15UV96gLZhjDstkXXxvCLsUXBGXPdSnLFbdpq8p9HmGsApME5hQTZ3emM2rnY5agb9rXpVGyy3bdW6EEgAtqt';
  var vector2_m02147483647h12147483646h2_private = 'xprvA2nrNbFZABcdryreWet9Ea4LvTJcGsqrMzxHx98MMrotbir7yrKCEXw7nadnHM8Dq38EGfSh6dqA9QWTyefMLEcBYJUuekgW4BYPJcr9E7j';

  // From python reference code, formatting unchanged
  var bip39_vectors = {
      "english": [
          [
          "00000000000000000000000000000000",
          "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
          "c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04"
              ],
          [
              "7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f",
          "legal winner thank year wave sausage worth useful legal winner thank yellow",
          "2e8905819b8723fe2c1d161860e5ee1830318dbf49a83bd451cfb8440c28bd6fa457fe1296106559a3c80937a1c1069be3a3a5bd381ee6260e8d9739fce1f607"
              ],
          [
              "80808080808080808080808080808080",
          "letter advice cage absurd amount doctor acoustic avoid letter advice cage above",
          "d71de856f81a8acc65e6fc851a38d4d7ec216fd0796d0a6827a3ad6ed5511a30fa280f12eb2e47ed2ac03b5c462a0358d18d69fe4f985ec81778c1b370b652a8"
              ],
          [
              "ffffffffffffffffffffffffffffffff",
          "zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong",
          "ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069"
              ],
          [
              "000000000000000000000000000000000000000000000000",
          "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent",
          "035895f2f481b1b0f01fcf8c289c794660b289981a78f8106447707fdd9666ca06da5a9a565181599b79f53b844d8a71dd9f439c52a3d7b3e8a79c906ac845fa"
              ],
          [
              "7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f",
          "legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will",
          "f2b94508732bcbacbcc020faefecfc89feafa6649a5491b8c952cede496c214a0c7b3c392d168748f2d4a612bada0753b52a1c7ac53c1e93abd5c6320b9e95dd"
              ],
          [
              "808080808080808080808080808080808080808080808080",
          "letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always",
          "107d7c02a5aa6f38c58083ff74f04c607c2d2c0ecc55501dadd72d025b751bc27fe913ffb796f841c49b1d33b610cf0e91d3aa239027f5e99fe4ce9e5088cd65"
              ],
          [
              "ffffffffffffffffffffffffffffffffffffffffffffffff",
          "zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when",
          "0cd6e5d827bb62eb8fc1e262254223817fd068a74b5b449cc2f667c3f1f985a76379b43348d952e2265b4cd129090758b3e3c2c49103b5051aac2eaeb890a528"
              ],
          [
              "0000000000000000000000000000000000000000000000000000000000000000",
          "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art",
          "bda85446c68413707090a52022edd26a1c9462295029f2e60cd7c4f2bbd3097170af7a4d73245cafa9c3cca8d561a7c3de6f5d4a10be8ed2a5e608d68f92fcc8"
              ],
          [
              "7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f",
          "legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title",
          "bc09fca1804f7e69da93c2f2028eb238c227f2e9dda30cd63699232578480a4021b146ad717fbb7e451ce9eb835f43620bf5c514db0f8add49f5d121449d3e87"
              ],
          [
              "8080808080808080808080808080808080808080808080808080808080808080",
          "letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless",
          "c0c519bd0e91a2ed54357d9d1ebef6f5af218a153624cf4f2da911a0ed8f7a09e2ef61af0aca007096df430022f7a2b6fb91661a9589097069720d015e4e982f"
              ],
          [
              "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          "zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote",
          "dd48c104698c30cfe2b6142103248622fb7bb0ff692eebb00089b32d22484e1613912f0a5b694407be899ffd31ed3992c456cdf60f5d4564b8ba3f05a69890ad"
              ],
          [
              "77c2b00716cec7213839159e404db50d",
          "jelly better achieve collect unaware mountain thought cargo oxygen act hood bridge",
          "b5b6d0127db1a9d2226af0c3346031d77af31e918dba64287a1b44b8ebf63cdd52676f672a290aae502472cf2d602c051f3e6f18055e84e4c43897fc4e51a6ff"
              ],
          [
              "b63a9c59a6e641f288ebc103017f1da9f8290b3da6bdef7b",
          "renew stay biology evidence goat welcome casual join adapt armor shuffle fault little machine walk stumble urge swap",
          "9248d83e06f4cd98debf5b6f010542760df925ce46cf38a1bdb4e4de7d21f5c39366941c69e1bdbf2966e0f6e6dbece898a0e2f0a4c2b3e640953dfe8b7bbdc5"
              ],
          [
              "3e141609b97933b66a060dcddc71fad1d91677db872031e85f4c015c5e7e8982",
          "dignity pass list indicate nasty swamp pool script soccer toe leaf photo multiply desk host tomato cradle drill spread actor shine dismiss champion exotic",
          "ff7f3184df8696d8bef94b6c03114dbee0ef89ff938712301d27ed8336ca89ef9635da20af07d4175f2bf5f3de130f39c9d9e8dd0472489c19b1a020a940da67"
              ],
          [
              "0460ef47585604c5660618db2e6a7e7f",
          "afford alter spike radar gate glance object seek swamp infant panel yellow",
          "65f93a9f36b6c85cbe634ffc1f99f2b82cbb10b31edc7f087b4f6cb9e976e9faf76ff41f8f27c99afdf38f7a303ba1136ee48a4c1e7fcd3dba7aa876113a36e4"
              ],
          [
              "72f60ebac5dd8add8d2a25a797102c3ce21bc029c200076f",
          "indicate race push merry suffer human cruise dwarf pole review arch keep canvas theme poem divorce alter left",
          "3bbf9daa0dfad8229786ace5ddb4e00fa98a044ae4c4975ffd5e094dba9e0bb289349dbe2091761f30f382d4e35c4a670ee8ab50758d2c55881be69e327117ba"
              ],
          [
              "2c85efc7f24ee4573d2b81a6ec66cee209b2dcbd09d8eddc51e0215b0b68e416",
          "clutch control vehicle tonight unusual clog visa ice plunge glimpse recipe series open hour vintage deposit universe tip job dress radar refuse motion taste",
          "fe908f96f46668b2d5b37d82f558c77ed0d69dd0e7e043a5b0511c48c2f1064694a956f86360c93dd04052a8899497ce9e985ebe0c8c52b955e6ae86d4ff4449"
              ],
          [
              "eaebabb2383351fd31d703840b32e9e2",
          "turtle front uncle idea crush write shrug there lottery flower risk shell",
          "bdfb76a0759f301b0b899a1e3985227e53b3f51e67e3f2a65363caedf3e32fde42a66c404f18d7b05818c95ef3ca1e5146646856c461c073169467511680876c"
              ],
          [
              "7ac45cfe7722ee6c7ba84fbc2d5bd61b45cb2fe5eb65aa78",
          "kiss carry display unusual confirm curtain upgrade antique rotate hello void custom frequent obey nut hole price segment",
          "ed56ff6c833c07982eb7119a8f48fd363c4a9b1601cd2de736b01045c5eb8ab4f57b079403485d1c4924f0790dc10a971763337cb9f9c62226f64fff26397c79"
              ],
          [
              "4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef",
          "exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top",
          "095ee6f817b4c2cb30a5a797360a81a40ab0f9a4e25ecd672a3f58a0b5ba0687c096a6b14d2c0deb3bdefce4f61d01ae07417d502429352e27695163f7447a8c"
              ],
          [
              "18ab19a9f54a9274f03e5209a2ac8a91",
          "board flee heavy tunnel powder denial science ski answer betray cargo cat",
          "6eff1bb21562918509c73cb990260db07c0ce34ff0e3cc4a8cb3276129fbcb300bddfe005831350efd633909f476c45c88253276d9fd0df6ef48609e8bb7dca8"
              ],
          [
              "18a2e1d81b8ecfb2a333adcb0c17a5b9eb76cc5d05db91a4",
          "board blade invite damage undo sun mimic interest slam gaze truly inherit resist great inject rocket museum chief",
          "f84521c777a13b61564234bf8f8b62b3afce27fc4062b51bb5e62bdfecb23864ee6ecf07c1d5a97c0834307c5c852d8ceb88e7c97923c0a3b496bedd4e5f88a9"
              ],
          [
              "15da872c95a13dd738fbf50e427583ad61f18fd99f628c417a61cf8343c90419",
          "beyond stage sleep clip because twist token leaf atom beauty genius food business side grid unable middle armed observe pair crouch tonight away coconut",
          "b15509eaa2d09d3efd3e006ef42151b30367dc6e3aa5e44caba3fe4d3e352e65101fbdb86a96776b91946ff06f8eac594dc6ee1d3e82a42dfe1b40fef6bcc3fd"
              ]
              ]
  }

  it('should initialize the class', function() {
    should.exist(BIP32);
  });

  it('should create a mainnet bip32', function() {
    var bip32 = new BIP32('mainnet');
    should.exist(bip32);
  });

  it('should create a testnet bip32', function() {
    var bip32 = new BIP32('testnet');
    should.exist(bip32);
  });

  it('should initialize test vector 1 from the extended public key', function() {
    var bip32 = new BIP32(vector1_m_public);
    should.exist(bip32);
  });

  it('should initialize test vector 1 from the extended private key', function() {
    var bip32 = new BIP32(vector1_m_private);
    should.exist(bip32);
  });

  it('should get the extended public key from the extended private key for test vector 1', function() {
    var bip32 = new BIP32(vector1_m_private);
    bip32.extendedPublicKeyString().should.equal(vector1_m_public);
  });

  it("should get m/0' ext. private key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector1_m0h_private);
  });

  it("should get m/0' ext. public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector1_m0h_public);
  });

  it("should get m/0'/1 ext. private key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector1_m0h1_private);
  });

  it("should get m/0'/1 ext. public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector1_m0h1_public);
  });

  it("should get m/0'/1 ext. public key from m/0' public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'");
    var child_pub = new BIP32(child.extendedPublicKeyString());
    var child2 = child_pub.derive("m/1");
    should.exist(child2);
    child2.extendedPublicKeyString().should.equal(vector1_m0h1_public);
  });

  it("should get m/0'/1/2h ext. private key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector1_m0h12h_private);
  });

  it("should get m/0'/1/2h ext. public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector1_m0h12h_public);
  });

  it("should get m/0'/1/2h/2 ext. private key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'/2");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector1_m0h12h2_private);
  });

  it("should get m/0'/1/2'/2 ext. public key from m/0'/1/2' public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'");
    var child_pub = new BIP32(child.extendedPublicKeyString());
    var child2 = child_pub.derive("m/2");
    should.exist(child2);
    child2.extendedPublicKeyString().should.equal(vector1_m0h12h2_public);
  });

  it("should get m/0'/1/2h/2 ext. public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'/2");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector1_m0h12h2_public);
  });

  it("should get m/0'/1/2h/2/1000000000 ext. private key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'/2/1000000000");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector1_m0h12h21000000000_private);
  });

  it("should get m/0'/1/2h/2/1000000000 ext. public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'/2/1000000000");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector1_m0h12h21000000000_public);
  });

  it("should get m/0'/1/2'/2/1000000000 ext. public key from m/0'/1/2'/2 public key from test vector 1", function() {
    var bip32 = new BIP32(vector1_m_private);
    var child = bip32.derive("m/0'/1/2'/2");
    var child_pub = new BIP32(child.extendedPublicKeyString());
    var child2 = child_pub.derive("m/1000000000");
    should.exist(child2);
    child2.extendedPublicKeyString().should.equal(vector1_m0h12h21000000000_public);
  });

  it('should initialize test vector 2 from the extended public key', function() {
    var bip32 = new BIP32(vector2_m_public);
    should.exist(bip32);
  });

  it('should initialize test vector 2 from the extended private key', function() {
    var bip32 = new BIP32(vector2_m_private);
    should.exist(bip32);
  });

  it('should get the extended public key from the extended private key for test vector 2', function() {
    var bip32 = new BIP32(vector2_m_private);
    bip32.extendedPublicKeyString().should.equal(vector2_m_public);
  });

  it("should get m/0 ext. private key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector2_m0_private);
  });

  it("should get m/0 ext. public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector2_m0_public);
  });

  it("should get m/0 ext. public key from m public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m");
    var child_pub = new BIP32(child.extendedPublicKeyString());
    var child2 = child_pub.derive("m/0");
    should.exist(child2);
    child2.extendedPublicKeyString().should.equal(vector2_m0_public);
  });

  it("should get m/0/2147483647h ext. private key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector2_m02147483647h_private);
  });

  it("should get m/0/2147483647h ext. public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector2_m02147483647h_public);
  });

  it("should get m/0/2147483647h/1 ext. private key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'/1");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector2_m02147483647h1_private);
  });

  it("should get m/0/2147483647h/1 ext. public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'/1");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector2_m02147483647h1_public);
  });

  it("should get m/0/2147483647h/1 ext. public key from m/0/2147483647h public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'");
    var child_pub = new BIP32(child.extendedPublicKeyString());
    var child2 = child_pub.derive("m/1");
    should.exist(child2);
    child2.extendedPublicKeyString().should.equal(vector2_m02147483647h1_public);
  });

  it("should get m/0/2147483647h/1/2147483646h ext. private key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'/1/2147483646'");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector2_m02147483647h12147483646h_private);
  });

  it("should get m/0/2147483647h/1/2147483646h ext. public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'/1/2147483646'");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector2_m02147483647h12147483646h_public);
  });

  it("should get m/0/2147483647h/1/2147483646h/2 ext. private key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'/1/2147483646'/2");
    should.exist(child);
    child.extendedPrivateKeyString().should.equal(vector2_m02147483647h12147483646h2_private);
  });

  it("should get m/0/2147483647h/1/2147483646h/2 ext. public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'/1/2147483646'/2");
    should.exist(child);
    child.extendedPublicKeyString().should.equal(vector2_m02147483647h12147483646h2_public);
  });

  it("should get m/0/2147483647h/1/2147483646h/2 ext. public key from m/0/2147483647h/2147483646h public key from test vector 2", function() {
    var bip32 = new BIP32(vector2_m_private);
    var child = bip32.derive("m/0/2147483647'/1/2147483646'");
    var child_pub = new BIP32(child.extendedPublicKeyString());
    var child2 = child_pub.derive("m/2");
    should.exist(child2);
    child2.extendedPublicKeyString().should.equal(vector2_m02147483647h12147483646h2_public);
  });

  describe('#seed', function() {

    it('should initialize a new BIP32 correctly from test vector 1 seed', function() {
      var hex = vector1_master;
      var bip32 = BIP32.seed(hex, 'livenet');
      should.exist(bip32);
      bip32.extendedPrivateKeyString().should.equal(vector1_m_private);
      bip32.extendedPublicKeyString().should.equal(vector1_m_public);
    });

    it('should initialize a new BIP32 correctly from test vector 2 seed', function() {
      var hex = vector2_master;
      var bip32 = BIP32.seed(hex, 'livenet');
      should.exist(bip32);
      bip32.extendedPrivateKeyString().should.equal(vector2_m_private);
      bip32.extendedPublicKeyString().should.equal(vector2_m_public);
    });

  });
  describe('#BIP39', function() {
    it('should have a wordlist of length 2048', function() {
      BIP39WordlistEn.length.should.equal(2048);
    });
    it('should generate a mnemonic phrase', function() {
      var phrase = BIP32.mnemonic(BIP39WordlistEn, 128);
    });
    it('should pass test vectors', function() {
      var vectors = bip39_vectors['english'];
      for (var v = 0 ; v < vectors.length ; v++) {
        var vector = vectors[v];
        var code = vector[0];
        var mnemonic = vector[1];
        var seed = vector[2];
        var mnemonic1 = BIP32.to_mnemonic(BIP39WordlistEn, new Buffer(code, 'hex'));
        var seed1 = BIP32.mnemonic_to_seed(mnemonic, 'TREZOR');
        mnemonic1.should.equal(mnemonic);
        seed1.toString().should.equal(new Buffer(seed, 'hex').toString());
      }
    });
  });

});
