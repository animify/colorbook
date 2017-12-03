import React from 'react';

import request from './../modules/Request';
import Intro from './../components/Intro';
import ColorBlock from './../components/ColorBlock';

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
            .get('/api/popular')
            .then((response) => {
                this.setState({
                    shots: response.data.content.shots
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
        const colorBlocks = this.renderColorBlocks(shots);

        return (
            <section className="contain">
                <div className="row">
                    <div className="col xs-12">
                        <Intro message="The latest &amp; most popular color palettes on Dribbble." />
                    </div>
                </div>
                <div className="row shots">
                    {colorBlocks}
                </div>
            </section>
        );
    }
}

export default Homepage;
