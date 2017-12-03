import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../images/logo.png';

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
                <img src={logoImage} alt="Colorbook logo" height="36" />
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
