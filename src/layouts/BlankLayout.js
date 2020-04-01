import React from 'react';

function Layout(props) {
  console.log('blank', props);
  return <div>{props.children}</div>;
}

export default Layout;
