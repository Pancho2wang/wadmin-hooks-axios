import React, { createContext } from 'react';

const LocaleContext = createContext({});

function Child(props) {
  const value = useContext(LocaleContext);
  return <div>{value?.count}</div>;
}

export default props => {
  return;
  <LocaleContext.Provider value={{ count: 1 }}>
    <Child />
  </LocaleContext.Provider>;
};
