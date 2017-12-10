
import { fromJS } from 'immutable';
import dealerReducer from '../reducer';

describe('dealerReducer', () => {
  it('returns the initial state', () => {
    expect(dealerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
