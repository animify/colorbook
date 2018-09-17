import React from 'react';
import OnVisible from 'react-on-visible';
import { Link } from 'react-router-dom';

const categoryList = ['Graphic Design', 'Photography', 'Interaction Design', 'Art Direction', 'Illustration', 'Industrial Design', 'Motion Graphics', 'Fashion', 'Architecture', 'Branding', 'Web Design'];

const Categories = () => (
    <OnVisible className="animate item">
        <div className="contain">
            <div className="categories">
                <h1 className="headline">Categories</h1>
                <div className="subheading">Observe color trends by viewing projects by category.</div>
                {categoryList.sort().map(category => (<h2 key={`cat-${category}`}><Link to={`/field/${category}`}>{category}</Link></h2>))}
            </div>
        </div>
    </OnVisible>
);

export default Categories;
