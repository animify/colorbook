import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import request from './../modules/Request';
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
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const dateParam = this.props.match.params.date;
        this.loadDate(dateParam, !!dateParam);
    }

    componentWillReceiveProps(state) {
        const dateParam = state.match.params.date;
        if (dateParam !== this.state.currentDate) {
            this.loadDate(dateParam, !!dateParam);
        }
    }

    getTimelineBlock(timelineData) {
        const colorBlocks = this.renderColorBlocks(timelineData.shots);
        const id = Math.random().toString(36).substring(7);

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
            const dateValid = moment(date).isValid();

            if (dateValid && moment(date).format('YYYY-MM-DD') === date) {
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
        const datePrevious = moment(this.state.currentDate).subtract(1, 'day').format('YYYY-MM-DD');
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
                <ColorBlock key={shot.id} shot={shot} />
            ));
        }

        return [];
    }

    render() {
        const contentData = this.state.content;
        const isLoading = this.state.loading;
        const customDate = this.state.customDate;
        const currentDate = this.state.currentDate;
        const daysAgo = moment().diff(moment(currentDate), 'days');
        const message = (customDate && daysAgo > 0) ? `You've travelled back in time to the most popular palettes on Dribbble, ${daysAgo} days ago.` : 'A timeline of the most popular daily color palettes on Dribbble.';

        return (
            <section className="contain">
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
                                (<div role="presentation" onClick={this.appendPreviousDay} className="button primary">Load previous day...</div>) :
                                (<div className="loader small dark" />)
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Timeline.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            date: PropTypes.node,
        }).isRequired,
    }).isRequired
};

export default Timeline;
