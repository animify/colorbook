import React from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import request from './../modules/Request';
import Helpers from './../modules/Helpers';
import Intro from './../components/Intro';
import ColorBlock from './../components/ColorBlock';

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shots: [],
            loading: false,
        };

        this.copy = this.copy.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    getData() {
        this.setState({
            loading: true
        });

        request
            .get('/api/popular')
            .then((response) => {
                this.setState({
                    loading: false,
                    shots: response.data.content.shots
                });
            });
    }

    copy(color) {
        this.props.show(color);
        Helpers.copy(color);
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
        const shots = this.state.shots;
        const colorBlocks = this.renderColorBlocks(shots);
        const isLoading = this.state.loading;
        const meta = {
            title: 'The Colorbook',
            description: 'The Colorbook creates and curates the most popular and trending color palettes on Dribbble everyday into an infinite timeline.',
            canonical: Helpers.url,
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
                <div className="row">
                    <div className="col xs-12">
                        <Intro message="The latest &amp; most popular color palettes trending on Dribbble right now." />
                    </div>
                </div>
                <div className="row shots">
                    { !isLoading ?
                        colorBlocks :
                        (<div className="loader small" />)
                    }
                </div>
            </section>
        );
    }
}

Homepage.propTypes = {
    show: PropTypes.func.isRequired
};

export default Homepage;
