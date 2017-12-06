import React from 'react';
import PropTypes from 'prop-types';

const Intro = ({ message, title }) => (
    <div className="content-intro">
        <small>{ title }</small>
        <h2>{ message }</h2>
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
