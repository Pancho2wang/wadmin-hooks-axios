import React from 'react';
import config from '../../../config';
const { apiSys } = config;

export default props => {
  const { protocol, hostname } = window.location;
  return (
    <iframe
      title="SQL监控"
      src={`${protocol}//${hostname}:8080${apiSys}/druid/sql.html`}
      style={{ width: '100%', minHeight: '45rem' }}
      frameBorder="0"
      scrolling="yes"
    />
  );
};
