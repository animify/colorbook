import React from 'react';
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
                            <ul className="list horizontal">
                                <li>
                                    <a>Popular</a>
                                </li>
                                <li>
                                    <a>By date</a>
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
