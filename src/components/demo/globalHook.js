import React from 'react';

import { useStore } from '../../utils/store';

export default props => {
  const [state] = useStore('demo');
  return <div>{state?.count}</div>;
};
