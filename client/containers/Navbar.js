import React from 'react';
import minicons from 'minicons';
import moment from 'moment';
import { Link } from 'react-router-dom';

import history from './../modules/History';
import primaryLogo from '../images/colorbook-logo-primary.svg';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.enableSearch = this.enableSearch.bind(this);
        this.disableSearch = this.disableSearch.bind(this);
        this.isTyping = this.isTyping.bind(this);
        this.goToTimeline = this.goToTimeline.bind(this);

        this.state = {
            dataFeed: [],
            searchValue: '',
            validSearchValue: true,
            searching: false
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
                searching: false
            });
        }
    }

    goToTimeline(event) {
        event.preventDefault();
        const date = this.state.searchValue;

        if (date) {
            const dateValid = moment(date).isValid();

            if (dateValid && moment(date).format('YYYY-MM-DD') === date) {
                history.push(`/timeline/${this.state.searchValue}`);
            } else {
                this.setState({
                    validSearchValue: false,
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

        return (
            <nav>
                <Link className="inline" to="/"><img src={primaryLogo} alt="Colorbook primary logo" height="36" /></Link>
                <ul className="list horizontal inline jump-to">
                    <li>
                        <form action="/" onSubmit={this.goToTimeline}>
                            <div className="input transparent">
                                { isSearching && (<input className={validSearchValue ? '' : 'invalid'} ref={input => input && input.focus()} autoComplete="off" type="text" name="jumpto" spellCheck={false} onBlur={this.disableSearch} placeholder="Jump to date e.g 2017-12-03..." onChange={this.isTyping} value={searchValue} />)}

                                <label htmlFor="jumpto" className="float-left">
                                    <div onClick={this.disableSearch} role="presentation" className={!isSearching ? 'hidden' : ''}>
                                        <i data-minicon="x" />
                                    </div>
                                    <div onClick={this.enableSearch} role="presentation" className={isSearching ? 'hidden' : ''}>
                                        <i data-minicon="search" />
                                    </div>
                                </label>
                            </div>
                        </form>
                    </li>
                </ul>
                <ul className="list horizontal float-right">
                    <li>
                        <Link to="/">Latest</Link>
                    </li>
                    <li>
                        <Link to="/timeline">Timeline</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;
