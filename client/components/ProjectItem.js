import React from 'react';
import PropTypes from 'prop-types';
import OnVisible from 'react-on-visible';
import { Link } from 'react-router-dom';
import Helpers from '../modules/Helpers';

const ProjectItem = ({ copy, project }) => (
    <OnVisible className="animate item">
        <Link to={`/project/${project.id}`}>
            <div className="preview" style={{ backgroundImage: `url(${project.imageUrl})` }}>
                <div className="description">
                    <div className="title">{project.title}</div>
                    {/* <div className="owners"><p>{project.owners.map(o => <Fragment key={o.username}>@{o.username} &nbsp;</Fragment>)}</p></div> */}
                </div>
            </div>
        </Link>
        <div className="colors">
            {project.colors.map(color => (
                <div
                    className="color tooltip"
                    role="presentation"
                    key={color}
                    data-content={`Copy ${color}`}
                    data-position="bottom right"
                    data-text="tiny"
                    onClick={() => copy(color)}
                >
                    <span
                        onMouseEnter={Helpers.colorMouseEnter}
                        onMouseLeave={Helpers.colorMouseLeave}
                        style={{ backgroundColor: color, borderColor: Helpers.borderColor(color, false) }}
                    />
                    <p>{color}</p>
                </div>
            ))}
        </div>
    </OnVisible>
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
        colors: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default ProjectItem;
