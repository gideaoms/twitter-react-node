import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';
import { Creators as TwitterCreators, Types as TwitterTypes } from '../../../store/ducks/twitter';
import rootSaga from '../../../store/sagas';
import api from '../../../config/api';

const apiMock = new MockAdapter(api);

describe('Twitter saga', () => {
  it('should be able to add new Tweet and after to reload tweets', async () => {
    const sagaTester = new SagaTester({
      initialState: { app: { user: { oauth_token: '123', oauth_token_secret: '123' } } },
    });
    sagaTester.run(rootSaga);

    const data = [
      { id: '1', text: 'Tweet 1' },
      { id: '2', text: 'Tweet 2' },
      { id: '3', text: 'Tweet 3' },
    ];

    apiMock.onPost('/twitter/add').reply(200);
    apiMock.onGet('/twitter/tweets').reply(200, data);

    sagaTester.dispatch(TwitterCreators.addTweet('New Tweet', () => {}));
    await sagaTester.waitFor(TwitterTypes.GET_LIST_SUCCESS);

    expect(sagaTester.getLatestCalledAction()).toEqual(TwitterCreators.getTweetsSuccess(data));
  });

  it('should be able to set token of user', async () => {
    const sagaTester = new SagaTester({});
    sagaTester.run(rootSaga);

    apiMock.onPost('/twitter/token').reply(200, { data: { user: '123' } });

    sagaTester.dispatch(TwitterCreators.validateTokenRequest('123', '123'));
    await sagaTester.waitFor(TwitterTypes.VALIDATE_TOKEN_SUCCESS);

    expect(sagaTester.getLatestCalledAction()).toEqual(
      TwitterCreators.validateTokenSuccess('123', '123'),
    );
  });
});
