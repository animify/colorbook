import React from 'react';
import PropTypes from 'prop-types';

import request from './../modules/Request';
import Intro from './../components/Intro';

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
                console.log(response.data.content);
                this.setState({
                    loading: false,
                    shot: response.data.content
                });
            });
    }

    render() {
        const shot = this.state.shot;
        const isLoading = this.state.loading;

        if (isLoading) {
            return (
                <section className="profile-contain loading">
                    <div className="row">
                        <div className="col xs-12">
                            <div className="description">
                                <div className="loader small dark" />
                            </div>
                        </div>
                    </div>
                </section>
            );
        }

        return (
            <section className="profile-contain">
                <div className="profile">
                    <div className="row">
                        <div className="col xs-12">
                            <div className="description">
                                <div className="inline">
                                    <img className="avatar" src={shot.user_avatar} height="60" alt="User avatar" />
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
                                <img src={shot.imageUrl} alt={`${shot.title} shot`} />
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
                                <p className="link"><a href={shot.url}>See original shot on Dribbble</a></p>
                                <p className="link"><a href={shot.user_url}>Explore more shots by <strong>@{shot.user_name}</strong></a></p>
                                <p className="link"><a>Download Adobe Photoshop (.aco) file</a></p>
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
