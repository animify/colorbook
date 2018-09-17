import React from 'react';
import { Link } from 'react-router-dom';

const categoryList = ['Graphic Design', 'Photography', 'Interaction Design', 'Art Direction', 'Illustration'];

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
                        <li><p className="header">Timeline</p></li>
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
                            <Link to="/categories">Browse by Category</Link>
                        </li>
                        {categoryList.sort().map(category => (
                            <li key={`footer-${category}`}>
                                <Link to={`/field/${category}`}>{category}</Link>
                            </li>
                        ))}
                    </ul>

                    <ul className="list right">
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
                            <a href="https://mansson.io">Say Hi! on Twitter</a>
                        </li>
                    </ul>
                </div>

                <div className="contain">
                    <div className="meta">
                        <p><strong>&copy; The Colorbook 2018</strong></p>
                        <small>All information &amp; images are copyright of their respective owners.</small>
                        <small className="muted">The Colorbook has no affiliation with Behance.</small>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
