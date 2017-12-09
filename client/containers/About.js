import React from 'react';
import DocumentMeta from 'react-document-meta';
import minicons from 'minicons';

import Intro from './../components/Intro';
import Helpers from './../modules/Helpers';

class About extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        minicons.swap();
    }

    render() {
        const meta = {
            title: 'About - The Colorbook',
            description: 'The Colorbook creates and curates the most popular and trending color palettes on Dribbble everyday into an infinite timeline.',
            canonical: `${Helpers.url}/about`,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'colorbook,dribbble,color,palette,homepage,timeline'
                }
            }
        };

        return (
            <section className="contain about-page">
                <DocumentMeta {...meta} />
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
