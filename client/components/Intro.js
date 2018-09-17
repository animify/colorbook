import React from 'react';
import PropTypes from 'prop-types';

const Intro = ({ message, title }) => (
    <div className="content-intro">
        <small>{title}</small>
        <h1>{message}</h1>
    </div>
);

Intro.defaultProps = {
    title: 'The Colorbook'
};

Intro.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired
};

export default Intro;
