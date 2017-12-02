import React from 'react';
import PropTypes from 'prop-types';
import request from './../modules/Request';

const ColorBlock = ({ shot }) => (
    <div className="color-block">
        {shot.colors.map(color => (
            <div className="color" key={color.substring(1)}>
                <span style={{ backgroundColor: color }} />
                <p>{ color }</p>
            </div>
        ))}
        <a href={shot.imageUrl}>Go to shot</a>
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
                {colorBlocks}
            </section>
        );
    }
}

ColorBlock.propTypes = {
    shot: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default Homepage;
