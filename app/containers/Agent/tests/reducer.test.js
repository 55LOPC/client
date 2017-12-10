
import { fromJS } from 'immutable';
import AgentReducer from '../reducer';

describe('AgentReducer', () => {
  it('returns the initial state', () => {
    expect(AgentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
