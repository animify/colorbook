import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
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
            <footer>
                <div className="contain">
                    <div className="row">
                        <div className="col xs-12 m-8">
                            <p><strong>&copy; The Colorbook 2018</strong></p>
                            <small>All information &amp; images are copyright of their respective owners.</small>
                            <small className="muted">The Colorbook has no affiliation with Behance.</small>
                        </div>
                        <div className="col xs-12 m-4">
                            <ul className="list">
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <a href="https://www.producthunt.com/posts/the-colorbook">Product Hunt</a>
                                </li>
                                <li>
                                    <a href="https://github.com/animify/colorbook/issues">Issues</a>
                                </li>
                                <li>
                                    <a href="https://mansson.io">@animify</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
