import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta/dist';
import OnVisible, { setDefaultProps } from 'react-on-visible';
import { Link } from 'react-router-dom';
import request from '../modules/Request';
import Helpers from '../modules/Helpers';
import Loader from '../components/Loader';
import ProjectItem from '../components/ProjectItem';

setDefaultProps({
    visibleClassName: 'appear',
    percent: 1
});

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

    renderProjectItems(projects) {
        if (projects && projects.length > 0) {
            return projects.map(project => (
                <ProjectItem key={project.id} project={project} copy={this.copy} />
            ));
        }

        return [];
    }

    render() {
        const projects = this.state.projects;
        const featuredProject = projects[0] || null;
        const projectItems = this.renderProjectItems(projects);
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
                {/* <Intro message="The latest &amp; most popular color palettes trending on Behance right now." /> */}
                {featuredProject ?
                    <Fragment>
                        <OnVisible className="animate">
                            <div className="featured">
                                <Link to={`/project/${featuredProject.id}`}>
                                    <div className="label">Featured Project</div>
                                    <div className="preview" style={{ backgroundImage: `url(${featuredProject.imageUrlHidpi})` }}>
                                        <div className="description">
                                            <h1 className="title">{featuredProject.title}</h1>
                                            <div className="owners">{featuredProject.owners.map(o => <span key={o.username}>@{o.username}</span>)}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </OnVisible>
                        <OnVisible className="animate delay-240">
                            <div className="label">Today&#39;s Projects</div>
                            <div className="projects">
                                {projectItems}
                            </div>
                        </OnVisible>
                    </Fragment>
                    : <Loader />}
            </section>
        );
    }
}

Homepage.propTypes = {
    show: PropTypes.func.isRequired
};

export default Homepage;
