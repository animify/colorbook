import React from 'react';
import PropTypes from 'prop-types';

const PageComponent = ({ subheading }) => (
    <h6 className="text grey">
        { subheading }
    </h6>
);

PageComponent.propTypes = {
    subheading: PropTypes.string
};

PageComponent.defaultProps = {
    subheading: 'Another page in the router.'
};

export default PageComponent;
