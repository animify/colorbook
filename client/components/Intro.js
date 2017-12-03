import React from 'react';
import PropTypes from 'prop-types';

const Intro = ({ message }) => (
    <div className="content-intro">
        <small>The Colorbook</small>
        <h2>{ message }</h2>
    </div>
);

Intro.propTypes = {
    message: PropTypes.string.isRequired
};

export default Intro;
