import React from 'react';
import { Link } from 'react-router-dom';

const LandingContainer = () => (
    <div>
        <h2 className="text grey">You made it! <span role="img" aria-label="wave">👋</span></h2>
        <br />
        <br />
        <Link className="button primary medium" to="/page">Lets go to another page</Link>
    </div>
);

export default LandingContainer;
