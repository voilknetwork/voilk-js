import Promise from 'bluebird';
import should from 'should';
import voilk from '../src';

const username = process.env.VOILK_USERNAME || 'guest123';
const password = process.env.VOILK_PASSWORD;
const activeWif = voilk.auth.toWif(username, password, 'active');

describe('voilk.hf20-accounts:', () => {
  it('has generated methods', () => {
    should.exist(voilk.broadcast.claimAccount);
    should.exist(voilk.broadcast.createClaimedAccount);
  });

  it('has promise methods', () => {
    should.exist(voilk.broadcast.claimAccountAsync);
    should.exist(voilk.broadcast.createClaimedAccountAsync);
  });


  describe('claimAccount', () => {

/*  Skip these tests. Voilk-js test infrastructure not set up for testing active auths
    Blocked by Voilk issue #3546
    it('signs and verifies auth', function(done) {
      let tx = {
        'operations': [[
          'claim_account', {
            'creator': username,
            'fee': '0.000 VOILK'}]]
      }

      voilk.api.callAsync('condenser_api.get_version', []).then((result) => {
        if(result['blockchain_version'] < '0.22.0') return done();

        voilk.broadcast._prepareTransaction(tx).then(function(tx){
          tx = voilk.auth.signTransaction(tx, [activeWif]);
          voilk.api.verifyAuthorityAsync(tx).then(
            (result) => {result.should.equal(true); done();},
            (err)    => {done(err);}
          );
        });
      });

    });

    it('claims and creates account', function(done) {
      this.skip(); // (!) need test account with enough RC

      voilk.api.callAsync('condenser_api.get_version', []).then((result) => {
        if(result['blockchain_version'] < '0.22.0') return done();

        voilk.broadcast.claimAccountAsync(activeWif, username, '0.000 VOILK', []).then((result) => {
            let newAccountName = username + '-' + Math.floor(Math.random() * 10000);
            let keys = voilk.auth.generateKeys(
                username, password, ['posting', 'active', 'owner', 'memo']);

            voilk.broadcast.createClaimedAccountAsync(
                activeWif,
                username,
                newAccountName,
                keys['owner'],
                keys['active'],
                keys['posting'],
                keys['memo'],
                {}, []
              ).then((result) => {
                should.exist(result);
                done();
            }, (err) => {done(err)});
        }, (err) => {done(err)});
      });
    });
*/
  });
});
