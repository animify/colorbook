import React from 'react';
import { Link } from 'react-router-dom';
import minicons from 'minicons';

import Intro from './../components/Intro';

class About extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        minicons.swap();
    }

    render() {
        return (
            <section className="contain about-page">
                <div className="row">
                    <div className="col xs-12">
                        <Intro title="About" message="A day by day timeline of the most popular color palettes on Dribbble." />
                    </div>
                    <div className="col xs-12">
                        <h5>The Colorbook was created as a solution to discovering the awesome color schemes used in shots on Dribbble, which is incredibly tedious in its current state. With The Colorbook, color trends can effortlessly be compared on a day to day basis, or even fall back into time using the timeline.</h5>
                        <ul className="list dashed about-links">
                            <li className="item">
                                Built by <a href="https://mansson.io">@animify</a>
                            </li>
                            <li className="item">
                                Have questions? <a href="mailto:hi@mansson.io?Subject=The%20Colorbook">Email us</a>
                            </li>
                            <li className="item">
                                Found an issue? <a href="https://github.com/animify/colorbook/issues">Report it</a>
                            </li>
                            <li className="item">
                                Want to contribute? <a href="https://github.com/animify/colorbook">Open source</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;
