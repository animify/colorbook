import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
    <div className="centered text-center">
        <h1>Webpack React Express</h1>
        { children }
    </div>
);

Layout.propTypes = {
    children: PropTypes.node
};

Layout.defaultProps = {
    children: []
};

export default Layout;
