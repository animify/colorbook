import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ shot }) => (
    <div className="col xs-12 color-col">
        <div className="color-block">
            <div className="description">
                <div className="inline">
                    <img className="avatar" src={shot.user_avatar} height="52" alt={shot.user_name} />
                </div>
                <div className="inline">
                    <h5><a href={shot.url}>{ shot.title }</a></h5>
                    <a href={shot.user_url}>@{ shot.user_name }</a>
                </div>
            </div>
            <div className="colors">
                {shot.colors.map(color => (
                    <div className="color tooltip dark" key={color.substring(1)} data-content={color} data-position="bottom right" data-text="small">
                        <span style={{ backgroundColor: color }} />
                        <p>{ color }</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

Profile.propTypes = {
    shot: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        url: PropTypes.string,
        user_name: PropTypes.string,
        user_url: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default Profile;
