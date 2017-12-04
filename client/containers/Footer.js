import React from 'react';

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
                        <div className="xs-12">
                            <p><strong>&copy; The Colorbook 2017</strong></p>
                            <small>All information &amp; images are copyright of their respective owners.</small>
                            <small className="muted">Colorbook has no affiliation with Dribbble.</small>
                        </div>
                        <div className="xs-12">
                            <ul className="list horizontal">
                                <li>
                                    <a>About</a>
                                </li>
                                <li>
                                    <a>@animify</a>
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
