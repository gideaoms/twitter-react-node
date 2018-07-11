const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const util = require('util');
const Twitter = require('twitter');

const { expect } = chai;
const promisifyStub = sinon.stub(util, 'promisify');
sinon
  .stub(Twitter.prototype, 'get')
  .returns([
    { id: '1', text: 'Twitter 01' },
    { id: '2', text: 'Twitter 02' },
    { id: '3', text: 'Twitter 03' },
  ]);
const twitterAddStub = sinon.stub(Twitter.prototype, 'post');

chai.use(chaiHttp);

const server = require('../../server');

describe('Twitter', () => {
  context('Api', () => {
    it('should be able to return a token that identifies the application on twitter', async () => {
      const tokenReverse = 'qw9YDAAAAAAA69xmAAABZH9LEls';
      const body = () => ({
        body: `oauth_token=${tokenReverse}&oauth_token_secret=xGjX1vwzVFxy1oxkXGB9Ui252rXxSZNn&oauth_callback_confirmed=true`,
      });
      promisifyStub.returns(body);
      const response = await chai.request(server).post('/twitter/reverse');

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token_reverse');
      expect(response.body.token_reverse).to.equal(tokenReverse);
    });
    it('should return access token to the user', async () => {
      const params = {
        oauth_token: 'xGjX1vwzVFxy1oxkXGB9Ui252rXxSZNn',
        oauth_verifier: 'df89s798dsf9sd8798ds7nf9n8798',
      };
      const body = () => ({
        body:
          'oauth_token=718221283-iz0R4ci3hjN0OABn6nAJ4XMdopF9eczRzsPe9VaT&oauth_token_secret=nicQFEQGrGWrhGt2upY6h8bgpWmoKZXaVX4TcoKxIGT2r&screen_name=gideao_ms&user_id=718221283',
      });
      promisifyStub.returns(body);
      const response = await chai
        .request(server)
        .post('/twitter/token')
        .send(params);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('oauth_token');
      expect(response.body).to.have.property('oauth_token_secret');
      expect(response.body).to.have.property('screen_name');
    });
    it("should return the tweets of the user's timeline", async () => {
      const params = {
        access_token_key: 'fd87sd8fsd68f7sd609jkfs90',
        access_token_secret: 'd8j7dhjd8dd65s5sysg8shs9',
      };
      const response = await chai
        .request(server)
        .get('/twitter/tweets')
        .send(params);

      expect(response).to.have.status(200);
      expect(response.body[0]).to.eql({ id: '1', text: 'Twitter 01' });
      expect(response.body).lengthOf(3);
    });
    it('should add a new twitter', async () => {
      const params = {
        access_token_key: 'fd87sd8fsd68f7sd609jkfs90',
        access_token_secret: 'd8j7dhjd8dd65s5sysg8shs9',
        tweet: 'Add Tweet',
      };
      const returnBody = { id: 123, text: params.tweet };
      twitterAddStub.returns(returnBody);
      const response = await chai
        .request(server)
        .post('/twitter/add')
        .send(params);

      expect(response).to.have.status(200);
      expect(response.body).to.eql(returnBody);
    });
  });
});
