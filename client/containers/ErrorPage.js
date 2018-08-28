import React from 'react';
import { Link } from 'react-router-dom';
import minicons from 'minicons';

import Intro from './../components/Intro';

class ErrorPage extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        minicons.swap();
    }

    render() {
        return (
            <section className="contain error-page">
                <div className="row">
                    <div className="col xs-12">
                        <Intro message="Well well well, it looks like you've hit a road block. Let's get you safe & sound again." />
                    </div>
                    <div className="col xs-12 m-6 error-link">
                        <div className="goto">
                            <h5>Most popular</h5>
                            <p>Discover the latest color trends on Behance right now.</p>
                            <div className="block goto-left">
                                <Link to="/timeline"><i data-minicon="arrow-left" /> To Most Popular</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col xs-12 m-6 error-link">
                        <div className="goto">
                            <h5>Timeline</h5>
                            <p>Travel back in time to explore color palettes from Behance.</p>
                            <div className="block goto-right">
                                <Link to="/timeline">To Timeline <i data-minicon="arrow-right" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ErrorPage;
