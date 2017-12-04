import React from 'react';
import { Link } from 'react-router-dom';
import primaryLogo from '../images/colorbook-logo-primary.svg';

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
                <Link to="/"><img src={primaryLogo} alt="Colorbook primary logo" height="36" /></Link>
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
