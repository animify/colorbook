import React from 'react';
import minicons from 'minicons';
import { Link } from 'react-router-dom';
import history from '../modules/History';
import primaryLogo from '../images/colorbook-logo-primary.svg';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.listenToPath = this.listenToPath.bind(this);

        this.state = {
            currentPath: location.pathname
        };
    }

    componentDidMount() {
        minicons.setOptions({
            observe: true,
            config: {
                name: 'feedlist-icons',
                props: {
                    height: 20,
                    width: 20,
                    stroke: '#959595'
                }
            }
        });

        minicons.swap();

        this.listenToPath();
    }

    listenToPath() {
        history.listen((location) => {
            this.setState({
                currentPath: location.pathname
            });
        });
    }

    render() {
        const currentPath = this.state.currentPath;

        return (
            <nav>
                <Link to="/" className="left"><img src={primaryLogo} alt="Colorbook primary logo" height="36" /></Link>
                <div className="center">
                    <ul className="list horizontal">
                        <li>
                            <Link className={currentPath === '/' ? 'active' : ''} to="/">All</Link>
                        </li>
                        <li>
                            <Link className={currentPath === '/time/today' ? 'active' : ''} to="/time/today">Today</Link>
                        </li>
                        <li>
                            <Link className={currentPath === '/time/week' ? 'active' : ''} to="/time/week">Week</Link>
                        </li>
                        <li>
                            <Link className={currentPath === '/time/month' ? 'active' : ''} to="/time/month">Month</Link>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <ul className="list horizontal">
                        <li>
                            <Link className={currentPath === '/categories' ? 'active' : ''} to="/categories">Categories...</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
