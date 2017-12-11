import React, { Component } from 'react';
import GA from 'react-ga';
import PropTypes from 'prop-types';

GA.initialize('UA-110926064-1');

const tracker = (InnerComponent, options = {}) => {
    const trackPage = (page) => {
        GA.set({
            page,
            ...options,
        });
        GA.pageview(page);
    };

    const TrackerModule = class extends Component {
        componentDidMount() {
            trackPage(this.props.location.pathname);
        }

        componentWillReceiveProps(nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        }

        render() {
            return <InnerComponent {...this.props} />;
        }
    };

    TrackerModule.propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string
        }).isRequired
    };

    return TrackerModule;
};

export default tracker;
