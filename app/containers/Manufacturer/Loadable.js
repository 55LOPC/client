/**
 *
 * Asynchronously loads the component for Manufacturer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
