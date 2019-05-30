import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => (
  <div>
    <header className="main-header" />
    {children}
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.number.isRequired
};

export default MainLayout;
