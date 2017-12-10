import { createSelector } from 'reselect';

/**
 * Direct selector to the Police state domain
 */
const selectPoliceDomain = (state) => state.get('Police');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Police
 */

const makeSelectPolice = () => createSelector(
  selectPoliceDomain,
  (substate) => substate.toJS()
);

export default makeSelectPolice;
export {
  selectPoliceDomain,
};
