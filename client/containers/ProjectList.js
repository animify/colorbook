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
            projects: [],
            loading: false,
        };

        this.copy = this.copy.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    getData() {
        const time = `${this.props.match.params.param}/${this.props.match.params.value}` || 'time/all';
        this.setState({
            loading: true
        });

        request
            .get(`/api/${time}`)
            .then((response) => {
                this.setState({
                    loading: false,
                    projects: response.data.content.projects
                });
            });
    }

    copy(color) {
        this.props.show(color);
        Helpers.copy(color);
    }

    renderColorBlocks(projects) {
        if (projects.length > 0) {
            return projects.map(project => (
                <ColorBlock key={project.id} project={project} copy={this.copy} />
            ));
        }

        return [];
    }

    render() {
        const projects = this.state.projects;
        const colorBlocks = this.renderColorBlocks(projects);
        const isLoading = this.state.loading;
        const meta = {
            title: 'The Colorbook',
            description: 'The Colorbook creates and curates the most popular and trending color palettes on Behance everyday into an infinite timeline.',
            canonical: Helpers.url,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'colorbook,behance,color,palette,homepage,timeline'
                }
            }
        };

        return (
            <section className="contain">
                <DocumentMeta {...meta} />
                <div className="row">
                    <div className="col xs-12">
                        <Intro message="The latest &amp; most popular color palettes trending on Behance right now." />
                    </div>
                </div>
                <div className="row projects">
                    {!isLoading ?
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
