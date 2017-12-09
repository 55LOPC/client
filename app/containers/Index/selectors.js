import { createSelector } from 'reselect';

/**
 * Direct selector to the index state domain
 */
const selectIndexDomain = (state) => state.get('index');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Index
 */

const makeSelectIndex = () => createSelector(
  selectIndexDomain,
  (substate) => substate.toJS()
);

export default makeSelectIndex;
export {
  selectIndexDomain,
};
