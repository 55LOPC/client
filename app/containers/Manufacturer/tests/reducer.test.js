
import { fromJS } from 'immutable';
import manufacturerReducer from '../reducer';

describe('manufacturerReducer', () => {
  it('returns the initial state', () => {
    expect(manufacturerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
