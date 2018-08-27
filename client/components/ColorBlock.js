import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helpers from './../modules/Helpers';

const mouseEnter = (e) => {
    const style = e.target.style;
    style.borderColor = Helpers.borderColor(style.backgroundColor, true);
};

const mouseLeave = (e) => {
    const style = e.target.style;
    style.borderColor = Helpers.borderColor(style.backgroundColor, false);
};

const ColorBlock = ({ copy, project }) => (
    <div className="col xs-12 color-col">
        <div className="color-block">
            <div className="description">
                <img className="avatar" src={project.imageUrl} height="60" alt={project.user_name} />
                <div className="meta">
                    <h5><Link to={project.url}>{project.title}</Link></h5>
                    <p className="owners">
                        {project.owners.map(owner => (
                            <a key={owner.username} href={owner.profile}>@{owner.username}</a>
                        ))}
                    </p>
                </div>
            </div>
            <div className="colors">
                {project.colors.map(color => (
                    <div className="color tooltip" role="presentation" key={color} data-content={`Copy ${color}`} data-position="bottom right" data-text="tiny" onClick={() => copy(color)}>
                        <span onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ backgroundColor: color, borderColor: Helpers.borderColor(color, false) }} />
                        <p>{color}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

ColorBlock.propTypes = {
    copy: PropTypes.func.isRequired,
    project: PropTypes.shape({
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
