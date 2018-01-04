import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class CopiedNotification extends React.Component {
    constructor(props) {
        super(props);

        this.notificationTimer = 0;
        this.state = {
            color: this.props.color,
            visible: false
        };

        this.showNotification = this.showNotification.bind(this);
        this.hideNotification = this.hideNotification.bind(this);
    }

    showNotification(color) {
        clearTimeout(this.notificationTimer);

        this.notificationTimer = setTimeout(() => this.hideNotification(), 5000);

        this.setState({
            color,
            visible: true
        });
    }

    componentWillReceiveProps(state) {
        const color = state.color;

        if (color !== this.state.color) {
            this.showNotification(color);
        }
    }

    hideNotification() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { color, visible } = this.state;

        return (
            <section className={ visible ? 'alert visible' : 'alert' }>
                <p><strong>{ color }</strong> copied to clipboard</p>
            </section>
        );
    }
}

CopiedNotification.propTypes = {
    color: PropTypes.string.isRequired
};

export default CopiedNotification;
