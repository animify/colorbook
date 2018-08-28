import React from 'react';
import DocumentMeta from 'react-document-meta';
import PropTypes from 'prop-types';

import request from './../modules/Request';
import Helpers from './../modules/Helpers';
import history from './../modules/History';
import Profile from './../components/Profile';

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            loading: true,
        };

        this.copy = this.copy.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    getData() {
        const id = this.props.match.params.id;

        request
            .get(`/api/project/${id}`)
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    this.setState({
                        loading: false,
                        project: response.data.content
                    });
                } else {
                    history.push('/404');
                }
            });
    }

    copy(color) {
        this.props.show(color);
        Helpers.copy(color);
    }

    render() {
        const project = this.state.project;
        const isLoading = this.state.loading;


        console.log(isLoading);
    
        if (isLoading) {
            return (
                <section className="profile-contain loading">
                    <div className="row">
                        <div className="col xs-12">
                            <div className="description">
                                <div className="loader small" />
                            </div>
                        </div>
                    </div>
                </section>
            );
        }

        const meta = {
            title: `${project.title} - The Colorbook`,
            description: 'The Colorbook creates and curates the most popular and trending color palettes on Behance everyday into an infinite timeline.',
            canonical: `${Helpers.url}/${project.id}`,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'colorbook,behance,color,palette,homepage,timeline'
                }
            }
        };
        
        return (
            <section className="profile-contain">
                <DocumentMeta {...meta} />
                <div className="profile">
                    <div className="row">
                        <div className="col xs-12">
                            <div className="description">
                                <div className="inline">
                                    <h3>{project.title}</h3>
                                    <p className="owners">
                                        {project.owners.map(owner => (
                                            <a key={owner.username} href={owner.profile}>@{owner.username}</a>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col xs-12">
                            <div className="profile-project">
                                <p className="small-title">Original project</p>
                                <img src={project.imageUrlHidpi} alt={`${project.title} project`} />
                            </div>
                        </div>
                    </div>
                    <div className="row profile-colors">
                        {project.colors && <Profile project={project} copy={this.copy} />}
                    </div>
                    <div className="row">
                        <div className="col xs-12">
                            <div className="profile-more">
                                <p className="small-title">More options</p>
                                <ul className="list dashed">
                                    <li className="item">
                                        <a href={project.url}>See original project on Behance</a>
                                    </li>
                                    {/* <li className="item">
                                        <a href={project.user_url}>Explore more projects by <strong>@{project.user_name}</strong></a>
                                    </li> */}
                                    <li className="item">
                                        <span className="disabled">Download Adobe Photoshop (.aco) palette file <strong className="text yellow">(coming soon)</strong></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Preview.propTypes = {
    show: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.node,
        }).isRequired,
    }).isRequired
};

export default Preview;
