import React from 'react';
import DocumentMeta from 'react-document-meta';
import PropTypes from 'prop-types';

import request from './../modules/Request';
import Helpers from './../modules/Helpers';
import history from './../modules/History';

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shot: [],
            loading: false,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    getData() {
        const id = this.props.match.params.id;

        this.setState({
            loading: true
        });

        request
            .get(`/api/shot/${id}`)
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        loading: false,
                        shot: response.data.content
                    });
                } else {
                    history.push('/404');
                }
            });
    }

    render() {
        const shot = this.state.shot;
        const isLoading = this.state.loading;
        const meta = {
            title: `${shot.title} - The Colorbook`,
            description: 'The Colorbook creates and curates the most popular and trending color palettes on Dribbble everyday into an infinite timeline.',
            canonical: `${Helpers.url}/${shot.id}`,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'colorbook,dribbble,color,palette,homepage,timeline'
                }
            }
        };

        if (isLoading) {
            return (
                <section className="profile-contain loading">
                    <DocumentMeta {...meta} />
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

        return (
            <section className="profile-contain">
                <DocumentMeta {...meta} />
                <div className="profile">
                    <div className="row">
                        <div className="col xs-12">
                            <div className="description">
                                <div className="inline">
                                    <img className="avatar" src={shot.user_avatar} height="66" alt="User avatar" />
                                </div>
                                <div className="inline">
                                    <h3>{shot.title}</h3>
                                    <a href={shot.user_url}>@{ shot.user_name } {shot.user_pro && (<span className="user-pro">pro</span>)}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col xs-12">
                            <div className="profile-shot">
                                <p className="small-title">Original shot</p>
                                <img src={shot.imageUrlHidpi} alt={`${shot.title} shot`} />
                            </div>
                        </div>
                    </div>
                    <div className="row profile-colors">
                        <div className="col xs-12">
                            <p className="small-title">Color palette</p>
                            {shot.colors && shot.colors.map(color => (
                                <div className="color" key={color.substring(1)}>
                                    <span style={{ backgroundColor: color }} />
                                    <p>{ color }</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col xs-12">
                            <div className="profile-more">
                                <p className="small-title">More options</p>
                                <ul className="list dashed">
                                    <li className="item">
                                        <a href={shot.url}>See original shot on Dribbble</a>
                                    </li>
                                    <li className="item">
                                        <a href={shot.user_url}>Explore more shots by <strong>@{shot.user_name}</strong></a>
                                    </li>
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
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.node,
        }).isRequired,
    }).isRequired
};

export default Preview;
