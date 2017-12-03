import React from 'react';
import moment from 'moment';

import request from './../modules/Request';
import Intro from './../components/Intro';
import ColorBlock from './../components/ColorBlock';
import DateTitle from './../components/DateTitle';

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment().format('YYYY-MM-DD'),
            loading: false,
            content: []
        };

        this.appendPreviousDay = this.appendPreviousDay.bind(this);
    }

    componentDidMount() {
        this.appendTimeline(this.state.currentDate);
    }

    getTimelineBlock(timelineData) {
        const colorBlocks = this.renderColorBlocks(timelineData.shots);

        return (
            <div className="row shots" key={timelineData.date}>
                <div className="col xs-12">
                    {timelineData.date && <DateTitle date={timelineData.date} />}
                </div>
                {colorBlocks}
            </div>
        );
    }

    appendPreviousDay() {
        const datePrevious = moment(this.state.currentDate).subtract(1, 'day').format('YYYY-MM-DD');
        this.appendTimeline(datePrevious);
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

        return (
            <section className="contain">
                <div className="row">
                    <div className="col xs-12">
                        <Intro message="A timeline of popular color palettes on Dribbble." />
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
                                (<p>Loading...</p>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Timeline;
