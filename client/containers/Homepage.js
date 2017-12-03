import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import request from './../modules/Request';

const Intro = () => (
    <div className="content-intro">
        <small>Colorbook</small>
        <h2>The latest &amp; most popular color palettes on Dribbble.</h2>
    </div>
);

const DateTitle = ({ date }) => {
    const nativeDate = new Date(date);
    const formatedDate = moment(nativeDate).format('LL');

    return (
        <h5 className="date">{formatedDate}</h5>
    );
};

const ColorBlock = ({ shot }) => (
    <div className="col xs-12 color-col">
        <div className="color-block">
            <div className="description">
                <div className="inline">
                    <img className="avatar" src={shot.user_avatar} height="52" alt={shot.user_name} />
                </div>
                <div className="inline">
                    <h4><a href={shot.url}>{ shot.title }</a></h4>
                    <a href={shot.user_url}>@{ shot.user_name }</a>
                </div>
            </div>
            <div className="colors">
                {shot.colors.map(color => (
                    <div className="color" key={color.substring(1)}>
                        <span style={{ backgroundColor: color }} />
                        <p>{ color }</p>
                    </div>
                ))}
            </div>
            {/* <a href={shot.url}>Go to shot</a> */}
        </div>
    </div>
);

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shots: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        request
            .get('/colors')
            .then((response) => {
                this.setState({
                    params: response.data.params,
                    shots: response.data.shots
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
        const shots = this.state.shots;
        const params = this.state.params;
        const colorBlocks = this.renderColorBlocks(shots);
        return (
            <section className="contain">
                <div className="row">
                    <div className="xs-12">
                        <Intro />
                    </div>
                </div>
                <div className="row shots">
                    {params && <DateTitle date={params.date} />}
                    {colorBlocks}
                </div>
            </section>
        );
    }
}

DateTitle.propTypes = {
    date: PropTypes.string.isRequired,
};

ColorBlock.propTypes = {
    shot: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        url: PropTypes.string,
        user_name: PropTypes.string,
        user_url: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default Homepage;
