import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }: { children: ReactElement }) => (
  <div>
    <header className="main-header" />
    {children}
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
