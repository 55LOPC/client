import { createSelector } from 'reselect';

/**
 * Direct selector to the dealer state domain
 */
const selectDealerDomain = (state) => state.get('dealer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Dealer
 */

const makeSelectDealer = () => createSelector(
  selectDealerDomain,
  (substate) => substate.toJS()
);

export default makeSelectDealer;
export {
  selectDealerDomain,
};
