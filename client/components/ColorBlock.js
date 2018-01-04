import React from 'react';
import tinycolor from 'tinycolor2';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const mouseEnter = (e) => {
    const style = e.target.style;
    style.borderColor = borderColor(style.backgroundColor, true);
}

const mouseLeave = (e) => {
    const style = e.target.style;
    style.borderColor = borderColor(style.backgroundColor, false);
}

const borderColor = (color, hovering) => {
    const amount = hovering ? 40 : 20;
    return tinycolor(color).lighten(amount).toString();
}

const ColorBlock = ({ copy, shot }) => (
    <div className="col xs-12 color-col">
        <div className="color-block">
            <div className="description">
                <div className="inline">
                    <img className="avatar" src={shot.user_avatar} height="54" alt={shot.user_name} />
                </div>
                <div className="inline">
                    <h5><Link to={`/s/${shot.id}`}>{ shot.title }</Link></h5>
                    <a href={shot.user_url}>@{ shot.user_name } {shot.user_pro && (<span className="user-pro">pro</span>)}</a>
                </div>
            </div>
            <div className="colors">
                {shot.colors.map((color, i) => (
                    <div className="color tooltip" role="presentation" key={color.substring(1)} data-content={`Copy ${color}`} data-position="bottom right" data-text="small" onClick={() => copy(color)}>
                        <span onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ backgroundColor: color, borderColor: borderColor(color, false) }} />
                        <p>{ color }</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

ColorBlock.propTypes = {
    copy: PropTypes.func.isRequired,
    shot: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        url: PropTypes.string,
        user_name: PropTypes.string,
        user_pro: PropTypes.boolean,
        user_url: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
};

export default ColorBlock;
