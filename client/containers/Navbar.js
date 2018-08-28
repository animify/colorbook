import React from 'react';
import minicons from 'minicons';
import moment from 'moment';
import { Link } from 'react-router-dom';

import history from './../modules/History';
import Helpers from './../modules/Helpers';
import primaryLogo from '../images/colorbook-logo-primary.svg';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.enableSearch = this.enableSearch.bind(this);
        this.disableSearch = this.disableSearch.bind(this);
        this.isTyping = this.isTyping.bind(this);
        this.goToTimeline = this.goToTimeline.bind(this);
        this.listenToPath = this.listenToPath.bind(this);

        this.state = {
            dataFeed: [],
            searchValue: '',
            validSearchValue: true,
            searchValueError: 'Oops, please use a YYYY-MM-DD date format',
            searching: false,
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

    enableSearch() {
        const isSearching = this.state.searching;

        if (!isSearching) {
            this.setState({
                searching: true
            });
        }
    }

    disableSearch() {
        const isSearching = this.state.searching;

        if (isSearching) {
            this.setState({
                validSearchValue: true,
                searching: false
            });
        }
    }

    goToTimeline(event) {
        event.preventDefault();
        const date = this.state.searchValue;

        if (date) {
            const dateValid = Helpers.validTimelineDate(date);

            if (dateValid) {
                history.push(`/timeline/${this.state.searchValue}`);
            } else {
                let searchValueError = 'Oops, you should use a YYYY-MM-DD date format';
                if (moment().diff(date, 'days') < 0) {
                    searchValueError = 'Unfortunately, we cant predict the future';
                }

                this.setState({
                    validSearchValue: false,
                    searchValueError
                });
            }
        }
    }

    isTyping(event) {
        const searchValue = event.target.value;

        this.setState({
            searchValue,
            validSearchValue: true
        });
    }

    render() {
        const isSearching = this.state.searching;
        const searchValue = this.state.searchValue;
        const validSearchValue = this.state.validSearchValue;
        const errorMessage = this.state.searchValueError;
        const currentPath = this.state.currentPath;

        return (
            <nav>
                <Link to="/"><img src={primaryLogo} alt="Colorbook primary logo" height="36" /></Link>
                <div className={isSearching ? 'actions searching' : 'actions'}>
                    <ul className="list horizontal float-right">
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
            </nav>
        );
    }
}

export default Navbar;
