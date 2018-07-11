import React from 'react';
import { shallow } from 'enzyme';
import createMockStore from 'redux-mock-store';
import TwitterList from '../../components/TwitterList';

const INITIAL_STATE = {
  twitter: {
    list: {
      loading: false,
      data: [{ id: 0, text: 'tweet 1' }, { id: 1, text: 'tweet 2' }, { id: 2, text: 'tweet 3' }],
    },
  },
};

const mockStore = createMockStore();
const store = mockStore(INITIAL_STATE);

describe('Twitter List component', () => {
  it('should render tweets', () => {
    const wrapper = shallow(<TwitterList />, { context: { store } });

    expect(wrapper.dive().find('li')).toHaveLength(3);
  });
});
