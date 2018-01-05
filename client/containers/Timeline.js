import React from 'react';
import DocumentMeta from 'react-document-meta';
import moment from 'moment';
import PropTypes from 'prop-types';

import request from './../modules/Request';
import Helpers from './../modules/Helpers';
import history from '../modules/History';
import Intro from './../components/Intro';
import ColorBlock from './../components/ColorBlock';
import DateTitle from './../components/DateTitle';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            loading: false,
            customDate: false,
            content: []
        };

        this.appendPreviousDay = this.appendPreviousDay.bind(this);
        this.renderColorBlocks = this.renderColorBlocks.bind(this);
        this.copy = this.copy.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const dateParam = this.props.match.params.date;
        this.loadDate(dateParam, !!dateParam);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.loading === this.state.loading)
            return false;

        return true;
    }

    copy(color) {
        this.props.show(color);
        Helpers.copy(color);
    }

    getTimelineBlock(timelineData) {
        const colorBlocks = this.renderColorBlocks(timelineData.shots);
        const id = Helpers.randomId();

        return (
            <div className="row shots" key={`${id}-${timelineData.date}`}>
                <div className="col xs-12">
                    {timelineData.date && <DateTitle date={timelineData.date} />}
                </div>
                {colorBlocks}
            </div>
        );
    }

    loadDate(date, custom) {
        let currentDate = moment().format('YYYY-MM-DD');

        if (date) {
            const dateValid = Helpers.validTimelineDate(date);

            if (dateValid) {
                currentDate = date;
            } else {
                history.replace('/timeline');
            }
        }

        this.setState({
            customDate: custom,
            currentDate
        });

        this.clearTimeline();
        this.appendTimeline(currentDate);
    }

    appendPreviousDay() {
        const datePrevious = Helpers.getPreviousDay(this.state.currentDate);
        this.appendTimeline(datePrevious);
    }

    clearTimeline() {
        this.setState({
            content: []
        });
    }

    appendTimeline(date) {
        this.setState({
            loading: true
        });

        request
            .get(`/api/timeline/${date}`)
            .then((response) => {
                const timelineData = {
                    date: response.data.content.date,
                    shots: response.data.content.shots
                };

                const content = this.state.content.slice();
                content.push(timelineData);

                this.setState({
                    currentDate: date,
                    loading: false,
                    content
                });
            });
    }

    renderColorBlocks(shots) {
        if (shots.length > 0) {
            return shots.map(shot => (
                <ColorBlock key={shot.id} shot={shot} copy={this.copy} />
            ));
        }

        return [];
    }

    render() {
        const contentData = this.state.content;
        const isLoading = this.state.loading;
        const customDate = this.state.customDate;
        const currentDate = this.state.currentDate;
        const daysAgo = Helpers.daysAgo(currentDate);
        const message = (customDate && daysAgo > 0) ? `You've travelled back in time to the most popular palettes on Dribbble, ${daysAgo} ${daysAgo > 1 ? 'days' : 'day'} ago.` : 'A timeline of the most popular daily color palettes on Dribbble.';
        const meta = {
            title: 'Timeline - The Colorbook',
            description: 'The Colorbook creates and curates the most popular and trending color palettes on Dribbble everyday into an infinite timeline.',
            canonical: `${Helpers.url}/timeline`,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'colorbook,dribbble,color,palette,homepage,timeline'
                }
            }
        };

        return (
            <section className="contain">
                <DocumentMeta {...meta} />
                <input className="copy-input" type="text" ref={(input) => { this.copyInput = input; }} />
                <div className="row">
                    <div className="col xs-12">
                        <Intro message={message} />
                    </div>
                </div>
                {contentData.map(data => (
                    this.getTimelineBlock(data)
                ))}
                <div className="row">
                    <div className="col xs-12">
                        <div className="previous-loader">
                            { !isLoading ?
                                (<div role="presentation" onClick={this.appendPreviousDay} className="button dark">
                                    Load previous day...
                                </div>) :
                                (<div role="presentation" onClick={this.appendPreviousDay} className="button dark loading">
                                    <div className="loader" />
                                    <span>Analyzing shots from {moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD')}...</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Timeline.propTypes = {
    show: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            date: PropTypes.node,
        }).isRequired,
    }).isRequired
};

export default Timeline;
