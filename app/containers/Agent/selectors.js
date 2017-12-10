import { createSelector } from 'reselect';

/**
 * Direct selector to the Agent state domain
 */
const selectAgentDomain = (state) => state.get('Agent');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Agent
 */

const makeSelectAgent = () => createSelector(
  selectAgentDomain,
  (substate) => substate.toJS()
);

export default makeSelectAgent;
export {
  selectAgentDomain,
};
