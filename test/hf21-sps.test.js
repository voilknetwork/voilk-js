import assert from "assert"
import Promise from 'bluebird';
import should from 'should';
import voilk from '../src';

const username = process.env.VOILK_USERNAME || 'guest123';
const password = process.env.VOILK_PASSWORD;
const activeWif = voilk.auth.toWif(username, password, 'active');

describe('voilk.hf21-accounts:', () => {
  it('has generated methods', () => {
    should.exist(voilk.broadcast.createProposal);
    should.exist(voilk.broadcast.updateProposalVotes);
    should.exist(voilk.broadcast.removeProposal);
  });

  it('has promise methods', () => {
    should.exist(voilk.broadcast.createProposalAsync);
    should.exist(voilk.broadcast.updateProposalVotesAsync);
    should.exist(voilk.broadcast.removeProposalAsync);
  });

  describe('create proposal ops', () => {
/*  Skip these tests. Voilk-js test infrastructure not set up for testing active auths
    Blocked by Voilk issue #3546
    it('signs and verifies create_proposal', function(done) {
      let permlink = 'test';

      let tx = {
        'operations': [[
          'create_proposal', {
            'creator': username,
            'receiver': username,
            'start_date': '2019-09-01T00:00:00',
            'end_date': '2019-10-01T00:00:00',
            'daily_pay': '1.000 VSD',
            'subject': 'testing',
            'permlink': permlink
        }]]
      }

      voilk.api.callAsync('condenser_api.get_version', []).then((result) => {
        if(result['blockchain_version'] < '0.22.0') return done();
        result.should.have.property('blockchain_version');

        voilk.broadcast._prepareTransaction(tx).then(function(tx){
          tx = voilk.auth.signTransaction(tx, [activeWif]);
          voilk.api.verifyAuthorityAsync(tx).then(
            (result) => {result.should.equal(true); done();},
            (err)    => {done(err);}
          );
        });
      });
    })

    it('signs and verifies update_proposal_votes', function(done) {
      let tx = {
        'operations': [[
          'update_proposal_votes', {
            'voter': username,
            'proposal_ids': [7],
            'approve': true
        }]]
      }

      return done();

      voilk.broadcast._prepareTransaction(tx).then(function(tx){
        tx = voilk.auth.signTransaction(tx, [activeWif]);
        voilk.api.verifyAuthorityAsync(tx).then(
          (result) => {result.should.equal(true); done();},
          (err)    => {done(err);}
        );
      });
    })
*/
  });
});
