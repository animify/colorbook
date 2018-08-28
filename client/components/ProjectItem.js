import React, { Fragment } from 'react';
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

const ProjectItem = ({ copy, project }) => (
    <div className="item">
        <div className="description">
            <img className="preview" src={project.imageUrl} alt={project.user_name} />
            <div className="meta">
                <div className="title"><Link to={`/project/${project.id}`}>{project.title}</Link></div>
                {/* <div className="owners"><p>{project.owners.map(o => <Fragment key={o.username}>@{o.username} &nbsp;</Fragment>)}</p></div> */}
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
);

ProjectItem.propTypes = {
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

export default ProjectItem;
