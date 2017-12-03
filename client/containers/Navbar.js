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
                <div className="contain">
                    <div className="row">
                        <div className="xs-12">
                            <ul className="list horizontal float-right">
                                <li>
                                    <Link to="/">Latest</Link>
                                </li>
                                <li>
                                    <Link to="/timeline">Timeline</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
