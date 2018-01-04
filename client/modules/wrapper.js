import React, { Component } from 'react';
import GA from 'react-ga';
import PropTypes from 'prop-types';
import CopiedNotification from './../components/CopiedNotification';

GA.initialize('UA-110926064-1');

const wrapper = (InnerComponent, options = {}) => {
    const trackPage = (page) => {
        GA.set({
            page,
            ...options,
        });
        GA.pageview(page);
    };

    const Layout = class extends Component {
        constructor() {
            super();

            this.state = {
                color: ''
            }

            this.showNotification = this.showNotification.bind(this);
        }
        componentDidMount() {
            this.notification = null;

            trackPage(this.props.location.pathname);
        }

        componentWillReceiveProps(nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        }

        showNotification(color) {
            this.setState({
                color
            })
        }

        render() {
            return (
                <div>
                    <CopiedNotification color={this.state.color} />
                    <InnerComponent {...this.props} show={this.showNotification} />
                </div>
            )
        }
    };

    Layout.propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string
        }).isRequired
    };

    return Layout;
};

export default wrapper;
