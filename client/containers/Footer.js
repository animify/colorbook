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
                    <ul className="list">
                        <li><p className="header">The Colorbook</p></li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <a href="https://www.producthunt.com/posts/the-colorbook">Product Hunt</a>
                        </li>
                        <li>
                            <a href="https://github.com/animify/colorbook">Open Source</a>
                        </li>
                        <li>
                            <a href="https://mansson.io">@animify</a>
                        </li>
                    </ul>
                    <ul className="list">
                        <li><p className="header">Timeline</p></li>
                        <li>
                            <Link to="/">All</Link>
                        </li>
                        <li>
                            <Link to="/time/today">Today</Link>
                        </li>
                        <li>
                            <Link to="/time/week">Week</Link>
                        </li>
                        <li>
                            <Link to="/time/month">Month</Link>
                        </li>
                    </ul>
                    <ul className="list">
                        <li><p className="header">Categories</p></li>
                        <li>
                            <Link to="/field/Editorial Design">Editorial Design</Link>
                        </li>
                        <li>
                            <Link to="/Illustration">Illustration</Link>
                        </li>
                        <li>
                            <Link to="/field/Industrial Design">Industrial Design</Link>
                        </li>
                        <li>
                            <Link to="/field/Product Design">Product Design</Link>
                        </li>
                        <li>
                            <Link to="/field/Storytelling">Storytelling</Link>
                        </li>
                        <li>
                            <Link to="/field/Typography">Typography</Link>
                        </li>
                    </ul>

                    <div className="meta">
                        <p><strong>&copy; The Colorbook 2018</strong></p>
                        <small>All information &amp; images are copyright of their respective owners.</small>
                        <br />
                        <small className="muted">The Colorbook has no affiliation with Behance.</small>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
