import React from 'react';
import PropTypes from 'prop-types';
import Helpers from './../modules/Helpers';

const mouseEnter = (e) => {
    const style = e.target.style;
    style.borderColor = Helpers.borderColor(style.backgroundColor, true);
}

const mouseLeave = (e) => {
    const style = e.target.style;
    style.borderColor = Helpers.borderColor(style.backgroundColor, false);
}

const Profile = ({ copy, shot }) => (
    <div className="col xs-12 color-col">
        <p className="small-title">Color palette</p>
        {shot.colors.map(color => (
            <div className="color" key={color.substring(1)}>
                <span onClick={() => copy(color)} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ backgroundColor: color, borderColor: Helpers.borderColor(color, false) }} />
                <p>{ color }</p>
            </div>
        ))}
    </div>
);

Profile.propTypes = {
    copy: PropTypes.func.isRequired,
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
