import React from 'react';
import { Link } from 'react-router-dom';
import OnVisible from 'react-on-visible';

export default function Featured({ project }) {
    console.log(project);
    return (
        <div className="contain">
            <div className="featured">
                <div className="lbl">Featured</div>
                <div className="info">
                    <div className="desc">
                        <OnVisible className="animate">
                            <h3 className="text primary">Palette of the day</h3>
                            <h1 className="headline">{project.title}</h1>
                            <div className="authors">
                                By &nbsp;
                                {project.owners.map(o => (
                                    <span key={o.username}>@{o.username}</span>
                                ))}
                            </div>
                        </OnVisible>
                    </div>
                </div>
                <OnVisible className="animate image">
                    {/* <Link to={`/project/${project.id}`}> */}
                    <div className="preview simple" style={{ backgroundImage: `url(${project.imageUrlHidpi})` }} />
                    {/* </Link> */}
                    <div className="colors">
                        {project.colors.map(color => (
                            <div className="color" style={{ backgroundColor: color }} />
                        ))}
                    </div>
                </OnVisible>
            </div>
        </div>
    );
}
