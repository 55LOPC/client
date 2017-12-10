
import { fromJS } from 'immutable';
import PoliceReducer from '../reducer';

describe('PoliceReducer', () => {
  it('returns the initial state', () => {
    expect(PoliceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
