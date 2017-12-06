import React from 'react';
import minicons from 'minicons';
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
            searchValueError: 'Oh oh, use a YYYY-MM-DD date format',
            searching: false,
            currentPath: this.getPath(history.location) || ''
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

    getPath(location) {
        return location.pathname.split('/').filter(pathname => pathname !== '')[0];
    }

    listenToPath() {
        history.listen((location) => {
            this.setState({
                currentPath: this.getPath(location) || ''
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
                this.setState({
                    validSearchValue: false,
                    searchValueError: 'Oh oh, use a YYYY-MM-DD date format'
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
                <Link className="inline" to="/"><img src={primaryLogo} alt="Colorbook primary logo" height="36" /></Link>
                <ul className="list horizontal inline jump-to">
                    <li>
                        <form action="/" onSubmit={this.goToTimeline}>
                            <div className="input transparent">
                                <span className={validSearchValue ? 'tooltip closed' : 'tooltip open invalid'} data-content={errorMessage} data-position="bottom left" data-text="small">
                                    { isSearching && (<input ref={input => input && input.focus()} autoComplete="off" type="text" name="jumpto" spellCheck={false} onBlur={this.disableSearch} placeholder="Jump to date e.g 2017-12-03..." onChange={this.isTyping} value={searchValue} />)}

                                    <label htmlFor="jumpto" className="float-left">
                                        <div onClick={this.disableSearch} role="presentation" className={!isSearching ? 'hidden' : ''}>
                                            <i data-minicon="x" />
                                        </div>
                                        <div onClick={this.enableSearch} role="presentation" className={isSearching ? 'hidden' : ''}>
                                            <i data-minicon="search" />
                                        </div>
                                    </label>
                                </span>
                            </div>
                        </form>
                    </li>
                </ul>
                <ul className="list horizontal float-right">
                    <li>
                        <Link className={currentPath === '' ? 'active' : ''} to="/">Most popular</Link>
                    </li>
                    <li>
                        <Link className={currentPath === 'timeline' ? 'active' : ''} to="/timeline">Timeline</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
