import React from 'react';
import DocumentMeta from 'react-document-meta';
import PropTypes from 'prop-types';
import OnVisible from 'react-on-visible';
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
        this.getData();
        window.scrollTo(0, 0);
    }

    getData() {
        const id = this.props.match.params.id;

        request.get(`/api/project/${id}`).then(response => {
            if (response.data.success) {
                this.setState({
                    loading: false,
                    project: response.data.content,
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
            description:
                'The Colorbook creates and curates the most popular and trending color palettes on Behance everyday into an infinite timeline.',
            canonical: `${Helpers.url}/${project.id}`,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'colorbook,behance,color,palette,homepage,timeline',
                },
            },
        };

        return (
            <section className="project">
                <DocumentMeta {...meta} />
                <div className="bg">
                    <div className="inner" style={{ backgroundImage: `url(${project.imageUrlHidpi})` }} />
                </div>
                <OnVisible className="animate noopacity contain">
                    <div className="display">
                        <div className="description">
                            <h1 className="title">{project.title}</h1>
                        </div>
                        <div className="preview simple" style={{ backgroundImage: `url(${project.imageUrlHidpi})` }} />
                        {/* <div className="colors large">
                            {project.colors.map(color => (
                                <div
                                    className="color tooltip"
                                    role="presentation"
                                    key={color}
                                    data-content={`Copy ${color}`}
                                    data-position="bottom right"
                                    data-text="tiny"
                                >
                                    <span
                                        onMouseEnter={Helpers.colorMouseEnter}
                                        onMouseLeave={Helpers.colorMouseLeave}
                                        style={{ backgroundColor: color, borderColor: Helpers.borderColor(color, false) }}
                                    />
                                    <p>{color}</p>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </OnVisible>
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
    }).isRequired,
};

export default Preview;
