import { createSelector } from 'reselect';

/**
 * Direct selector to the manufacturer state domain
 */
const selectManufacturerDomain = (state) => state.get('manufacturer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Manufacturer
 */

const makeSelectManufacturer = () => createSelector(
  selectManufacturerDomain,
  (substate) => substate.toJS()
);

export default makeSelectManufacturer;
export {
  selectManufacturerDomain,
};
