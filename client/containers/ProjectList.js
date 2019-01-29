import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta/dist';
import OnVisible, { setDefaultProps } from 'react-on-visible';
import request from '../modules/Request';
import Helpers from '../modules/Helpers';
import Loader from '../components/Loader';
import ProjectItem from '../components/ProjectItem';
import Featured from './Featured';

setDefaultProps({
    visibleClassName: 'appear',
    percent: 1,
});

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            loading: false,
            param: this.props.match.params.param || 'time',
            value: this.props.match.params.value || 'all',
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
        const { param, value } = this.state;
        const search = `${param}/${value}`;
        this.setState({
            loading: true,
        });

        request.get(`/api/${search}`).then(response => {
            this.setState({
                loading: false,
                projects: response.data.content.projects,
            });
        });
    }

    copy(color) {
        this.props.show(color);
        Helpers.copy(color);
    }

    renderProjectItems(projects) {
        if (projects && projects.length > 0) {
            return projects.map(project => <ProjectItem key={project.id} project={project} copy={this.copy} />);
        }

        return [];
    }

    render() {
        const { projects, param, value } = this.state;
        const featuredProject = projects[5] || null;
        const listLabel =
            param === 'time'
                ? `${!['all', 'today'].includes(value) ? 'This ' : ''}${value}${!['all'].includes(value) ? "'s" : ''} projects`
                : `${param} - ${value}`;
        const projectItems = this.renderProjectItems(projects);
        const meta = {
            title: 'The Colorbook',
            description:
                'The Colorbook creates and curates the most popular and trending color palettes on Behance everyday into an infinite timeline.',
            canonical: Helpers.url,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'colorbook,behance,color,palette,homepage,timeline',
                },
            },
        };

        return (
            <Fragment>
                <DocumentMeta {...meta} />
                {/* <Intro message="The latest &amp; most popular color palettes trending on Behance right now." /> */}
                {featuredProject ? <Featured project={featuredProject} /> : <Loader />}
                <section className="project-list">
                    <div className="bg">
                        <div className="contain">
                            <OnVisible className="animate delay-240">
                                {/* <div className="label">{listLabel}</div> */}
                                <h1 className="headline">{listLabel}</h1>
                                <div className="projects">{projectItems}</div>
                            </OnVisible>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

Homepage.propTypes = {
    show: PropTypes.func.isRequired,
};

export default Homepage;
