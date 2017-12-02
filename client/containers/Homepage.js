import React from 'react';
import PropTypes from 'prop-types';
import request from './../modules/Request';

const ColorBlock = ({ shot }) => (
    <div className="col xs-12 color-col">
        <div className="color-block">
            <div className="description">
                <h4>{ shot.title }</h4>
                <a href={shot.user_url}>@{ shot.user_name }</a>
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
            dataFeed: []
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
                    dataFeed: response.data
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
        const dataFeed = this.state.dataFeed;
        const colorBlocks = this.renderColorBlocks(dataFeed);

        return (
            <section className="contain">
                <div className="row">
                    {colorBlocks}
                </div>
            </section>
        );
    }
}

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
