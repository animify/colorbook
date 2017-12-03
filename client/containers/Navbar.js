import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFeed: []
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <nav>
                <ul className="list horizontal float-right">
                    <li>
                        <Link to="/">Latest</Link>
                    </li>
                    <li>
                        <Link to="/timeline">Timeline</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
